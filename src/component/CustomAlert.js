import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler,
  Alert as RNAlert,
} from 'react-native';

// Store reference to native RN Alert
export const originalAlert = RNAlert.alert;

let alertListener = null;

export const registerAlertListener = (listener) => {
  alertListener = listener;
};

export const unregisterAlertListener = () => {
  alertListener = null;
};

/**
 * Global alert trigger that formats and shows our custom sentence-fitting dialog
 */
export const customAlert = (title, message, buttons, options) => {
  let finalTitle = typeof title === 'string' ? title : '';
  let finalMessage = typeof message === 'string' ? message : '';
  let finalButtons = buttons;
  let finalOptions = options;

  // If buttons are passed as second parameter: Alert.alert("Message", [{ text: "OK" }])
  if (Array.isArray(message)) {
    finalButtons = message;
    finalMessage = '';
    if (buttons && typeof buttons === 'object' && !Array.isArray(buttons)) {
      finalOptions = buttons;
    }
  }

  // If only one text is passed (or one is empty), treat it as the main message
  if (finalTitle && (!finalMessage || finalMessage.trim() === '')) {
    finalMessage = finalTitle;
    finalTitle = '';
  } else if (!finalTitle && finalMessage) {
    finalTitle = '';
  }

  // Ensure default button if none provided
  if (!finalButtons || !Array.isArray(finalButtons) || finalButtons.length === 0) {
    finalButtons = [{ text: 'OK' }];
  }

  if (alertListener) {
    alertListener({
      visible: true,
      title: finalTitle,
      message: finalMessage,
      buttons: finalButtons,
      options: finalOptions || {},
    });
  } else {
    // Fallback to original React Native alert if component is not mounted yet
    originalAlert(title, message, buttons, options);
  }
};

// Monkey-patch Alert.alert so existing calls across the app automatically use this
RNAlert.alert = customAlert;

const CustomAlert = () => {
  const [config, setConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    options: {},
  });

  useEffect(() => {
    registerAlertListener(setConfig);
    return () => {
      unregisterAlertListener();
    };
  }, []);

  const handleClose = useCallback(() => {
    setConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  // Handle hardware back button on Android
  useEffect(() => {
    if (!config.visible) return;

    const onBackPress = () => {
      if (config.options?.cancelable !== false) {
        handleClose();
        if (typeof config.options?.onDismiss === 'function') {
          config.options.onDismiss();
        }
      }
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => subscription.remove();
  }, [config.visible, config.options, handleClose]);

  const handleButtonPress = (btn) => {
    handleClose();
    if (btn && typeof btn.onPress === 'function') {
      // Delay slightly to ensure smooth transition if onPress opens another alert
      setTimeout(() => {
        btn.onPress();
      }, 50);
    }
  };

  const handleOverlayPress = () => {
    if (config.options?.cancelable === true) {
      handleClose();
      if (typeof config.options?.onDismiss === 'function') {
        config.options.onDismiss();
      }
    }
  };

  if (!config.visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={config.visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (config.options?.cancelable !== false) {
          handleClose();
          if (typeof config.options?.onDismiss === 'function') {
            config.options.onDismiss();
          }
        }
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlay}
        onPress={handleOverlayPress}
      >
        <TouchableWithoutFeedback>
          <View style={styles.dialogBox}>
            {Boolean(config.title) && (
              <Text style={styles.title}>{config.title}</Text>
            )}

            {Boolean(config.message) && (
              <Text
                style={[
                  styles.message,
                  Boolean(config.title) && styles.messageWithTitle,
                ]}
              >
                {config.message}
              </Text>
            )}

            <View style={styles.buttonContainer}>
              {config.buttons.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => handleButtonPress(btn)}
                >
                  <Text style={styles.buttonText}>
                    {btn.text ? btn.text.toUpperCase() : 'OK'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  dialogBox: {
    backgroundColor: '#383838', // Matches Android dark theme in screenshots
    borderRadius: 6,
    paddingTop: 22,
    paddingBottom: 14,
    paddingHorizontal: 24,
    minWidth: 260,
    maxWidth: 340,
    width: '100%',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  message: {
    fontSize: 15.5,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 22,
  },
  messageWithTitle: {
    fontSize: 14.5,
    color: '#E0E0E0',
    fontWeight: 'normal',
    lineHeight: 20,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 18,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
    minWidth: 48,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4db6ac', // Cyan/Teal accent matching screenshots
    letterSpacing: 0.8,
  },
});

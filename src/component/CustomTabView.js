import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

const CustomTabView = (props) => {
  const { data } = props;

  const [activeTab, setActiveTab] = useState([]);

  useEffect(() => {
    setActiveTab(data); // Set the initial active tab based on provided data
  }, [data]);

  const clickHandler = (item, index) => {
    // Handle tab click event
    setActiveTab((prevState) =>
      prevState.map((tab, i) =>
        i === index
          ? { ...tab, tabId: tab.tabId } // Example of setting active tab
          : tab
      )
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={styles.baseContainer}>
          <View style={styles.tabContainer}>
            {/* Tab 1 */}
            <TouchableOpacity onPress={() => clickHandler(item, index)}>
              <View
                style={[
                  styles.tabButton,
                  item.tabId === "1" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    item.tabId === "1" && styles.activeTabText,
                  ]}
                >
                  {item.tabHeader}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Tab 2 */}
            <TouchableOpacity onPress={() => clickHandler(item, index)}>
              <View
                style={[
                  styles.tabButton,
                  item.tabId === "2" && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    item.tabId === "2" && styles.activeTabText,
                  ]}
                >
                  {item.tabHeader}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Render content based on active tab */}
          {item.tabId === "1" && <Text>Content for Tab 1</Text>}
          {item.tabId === "2" && <Text>Content for Tab 2</Text>}
        </View>
      </View>
    );
  };

  const renderNodata = () => {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data found</Text>
      </View>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={{ marginBottom: 20 }}>
        <FlatList
          data={activeTab}
          keyExtractor={(item) => item.tabId.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderNodata}
        />
      </ScrollView>
    </View>
  );
};

export default CustomTabView;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  baseContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tabButton: {
    padding: 10,
    backgroundColor: "#F1F1F1",
    margin: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
  },
});
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { getData } from '../../../Utils/localHelper';
import { GetPointHistoryThunk } from '../../../Services/GetPointsService/GetPointSlice';
import { sortHistoryData } from '../../../Utils/rewardHistoryUtils';
import RewardHistoryTable from './RewardHistoryTable';
import HistoryLoadingState from './HistoryLoadingState';
import HistoryEmptyState from './HistoryEmptyState';
import HistoryErrorState from './HistoryErrorState';

const RewardHistoryTab = ({ deviceId, refreshing: parentRefreshing, onRefreshParent }) => {
  const dispatch = useDispatch();
  const pointsHistoryData = useSelector(state => state.getPoints?.PointsHistoryData);
  const pointsHistoryError = useSelector(state => state.getPoints?.PointsHistoryError);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistoryData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Customer ID retrieved dynamically from user session (AsyncStorage)
      const custId = await getData('CustId');

      // DevID dynamically retrieved using application's DeviceInfo service
      const devId = deviceId || (await DeviceInfo.getUniqueId());

      // Exact request payload - no duplicate fields
      const payload = {
        CustId: custId,
        DevID: devId,
      };

      console.log('RewardHistoryTab - Fetch Payload (POINTS_HISTORY):', JSON.stringify(payload));
      const resultAction = await dispatch(GetPointHistoryThunk(payload));
      console.log('RewardHistoryTab - Fetch Response:', JSON.stringify(resultAction));
      
      if (GetPointHistoryThunk.rejected.match(resultAction)) {
        const message = resultAction.payload || 'Unable to load history.';
        console.log('RewardHistoryTab - Fetch Rejected:', message);
        setErrorMsg(message);
      }
    } catch (err) {
      console.log('RewardHistoryTab - Error fetching history:', err);
      setErrorMsg(err?.message || 'Unable to load history.');
    } finally {
      setLoading(false);
    }
  }, [dispatch, deviceId]);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (onRefreshParent) {
      await onRefreshParent();
    }
    await fetchHistoryData();
    setRefreshing(false);
  };

  // Sort data latest first while preserving tie order
  const rawList = Array.isArray(pointsHistoryData) ? pointsHistoryData : [];
  const sortedData = sortHistoryData(rawList);

  const renderBody = () => {
    if (loading && !refreshing && sortedData.length === 0) {
      return <HistoryLoadingState />;
    }

    if (errorMsg || pointsHistoryError) {
      if (sortedData.length === 0) {
        return <HistoryErrorState errorMessage={errorMsg || pointsHistoryError} onRetry={fetchHistoryData} />;
      }
    }

    if (!loading && sortedData.length === 0) {
      return <HistoryEmptyState />;
    }

    return <RewardHistoryTable data={sortedData} />;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing || Boolean(parentRefreshing)} onRefresh={onRefresh} />
      }
    >
      {renderBody()}
    </ScrollView>
  );
};

export default RewardHistoryTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { getData } from '../../../Utils/localHelper';
import { GetArmsPointsHistoryThunk } from '../../../Services/GetPointsService/GetPointSlice';
import { sortHistoryData } from '../../../Utils/rewardHistoryUtils';
import RewardHistoryTable from './RewardHistoryTable';
import HistoryLoadingState from './HistoryLoadingState';
import HistoryEmptyState from './HistoryEmptyState';
import HistoryErrorState from './HistoryErrorState';

const RewardHistoryTab = ({ deviceId, refreshing: parentRefreshing, onRefreshParent }) => {
  const dispatch = useDispatch();
  const armsPointsHistoryData = useSelector(state => state.getPoints?.ArmsPointsHistoryData);
  const armsPointsHistoryError = useSelector(state => state.getPoints?.ArmsPointsHistoryError);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistoryData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // TODO: TEMPORARY TESTING ONLY - CustId is hardcoded to 4 for testing.
      // Revert to logged-in user session ID (await getData('CustId')) after backend verification.
      const custId = 4;

      // DevID dynamically retrieved using application's DeviceInfo service
      const devId = deviceId || (await DeviceInfo.getUniqueId());

      // Exact request payload - no duplicate fields
      const payload = {
        CustId: custId,
        DevID: devId,
      };

      console.log('RewardHistoryTab - Fetch Payload:', JSON.stringify(payload));
      const resultAction = await dispatch(GetArmsPointsHistoryThunk(payload));
      
      if (GetArmsPointsHistoryThunk.rejected.match(resultAction)) {
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
  const rawList = Array.isArray(armsPointsHistoryData) ? armsPointsHistoryData : [];
  const sortedData = sortHistoryData(rawList);

  const renderBody = () => {
    if (loading && !refreshing && sortedData.length === 0) {
      return <HistoryLoadingState />;
    }

    if (errorMsg || armsPointsHistoryError) {
      if (sortedData.length === 0) {
        return <HistoryErrorState errorMessage={errorMsg || armsPointsHistoryError} onRetry={fetchHistoryData} />;
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

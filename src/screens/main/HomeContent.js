import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const HomeContent = () => {
  const [salesFilter, setSalesFilter] = useState('Today');
  const [trendingFilter, setTrendingFilter] = useState('Day');

  // Mock data for pie chart
  const pieData = [
    { name: 'Maize', population: 40, color: '#7C3AED', legendFontColor: '#4B5563', legendFontSize: 14 },
    { name: 'Beans', population: 30, color: '#F59E0B', legendFontColor: '#4B5563', legendFontSize: 14 },
    { name: 'Others', population: 30, color: '#4B5563', legendFontColor: '#4B5563', legendFontSize: 14 },
  ];

  // Mock data for trending sales table
  const trendingData = [
    { product: 'Maize', quantity: '50kg', percentage: '40%' },
    { product: 'Beans', quantity: '30kg', percentage: '30%' },
    { product: 'Rice', quantity: '20kg', percentage: '20%' },
    { product: 'Sugar', quantity: '10kg', percentage: '10%' },
  ];

  const renderSummaryCard = (title, value, icon) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Icon name={icon} size={24} color="#7C3AED" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );

  const renderTableRow = ({ product, quantity, percentage }) => (
    <View style={styles.tableRow} key={product}>
      <Text style={styles.tableCell}>{product}</Text>
      <Text style={styles.tableCell}>{quantity}</Text>
      <Text style={styles.tableCell}>{percentage}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Message */}
        <Text style={styles.welcomeTitle}>Jambo, Limo’s Grocery!</Text>
        <Text style={styles.welcomeText}>Pata Faida na DukaPay! Monitor your shop’s performance.</Text>

        {/* Summary Cards */}
        <View style={styles.cardsContainer}>
          {renderSummaryCard('Daily Sales', 'KSH 10,000', 'monetization-on')}
          {renderSummaryCard('New Members', '5', 'person-add')}
          {renderSummaryCard('Total Income', 'KSH 50,000', 'account-balance')}
          {renderSummaryCard('Trending Sales', 'Maize: 50kg', 'trending-up')}
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Daily Sales Breakdown</Text>
            <RNPickerSelect
              onValueChange={(value) => setSalesFilter(value)}
              items={[
                { label: 'Today', value: 'Today' },
                { label: 'Week', value: 'Week' },
                { label: 'Month', value: 'Month' },
              ]}
              style={pickerSelectStyles}
              value={salesFilter}
              placeholder={{}}
              Icon={() => <Icon name="arrow-drop-down" size={24} color="#7C3AED" />}
            />
          </View>
          <PieChart
            data={pieData}
            width={screenWidth - 72} // Adjust for padding
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Trending Sales Table */}
        <View style={styles.tableContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Trending Sales</Text>
            <RNPickerSelect
              onValueChange={(value) => setTrendingFilter(value)}
              items={[{ label: 'Day', value: 'Day' }, { label: 'Week', value: 'Week' }, { label: 'Monthly', value: 'Monthly' }]}
              style={pickerSelectStyles}
              value={trendingFilter}
              placeholder={{}}
              Icon={() => <Icon name="arrow-drop-down" size={24} color="#7C3AED" />}
            />
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Product</Text>
            <Text style={styles.tableHeaderCell}>Quantity</Text>
            <Text style={styles.tableHeaderCell}>Percentage</Text>
          </View>
          {trendingData.map(renderTableRow)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7C3AED',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  tableContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    color: '#1F2937',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    color: '#1F2937',
  },
  iconContainer: {
    top: 12,
    right: 8,
  },
});

export default HomeContent;
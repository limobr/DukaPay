import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { PieChart, LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const HomeContent = ({ userType = 'admin' }) => {
  const [salesFilter, setSalesFilter] = useState('Today');
  const [trendingFilter, setTrendingFilter] = useState('Day');

  // Log userType for debugging
  console.log('HomeContent userType:', userType);

  // Mock data for admin and employee
  const mockData = {
    admin: {
      totalIncome: 'KSH 50,000',
      businessRevenues: 'KSH 200,000',
      todayOrders: '10',
      activeCustomers: '15',
      pieData: [
        { name: 'Maize', population: 40, color: '#7C3AED', legendFontColor: '#4B5563', legendFontSize: 14 },
        { name: 'Beans', population: 30, color: '#F59E0B', legendFontColor: '#4B5563', legendFontSize: 14 },
        { name: 'Others', population: 30, color: '#4B5563', legendFontColor: '#4B5563', legendFontSize: 14 },
      ],
      revenueTrend: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{ data: [5000, 7000, 6000, 8000, 10000] }],
      },
      topProducts: [
        { product: 'Maize', revenue: 'KSH 20,000', percentage: '40%' },
        { product: 'Beans', revenue: 'KSH 15,000', percentage: '30%' },
        { product: 'Rice', revenue: 'KSH 10,000', percentage: '20%' },
        { product: 'Sugar', revenue: 'KSH 5,000', percentage: '10%' },
      ],
    },
    employee: {
      mySales: 'KSH 5,000',
      todayOrders: '10',
      activeCustomers: '15',
      trendingProducts: 'Maize: 50kg',
      pieData: [
        { name: 'Maize', population: 50, color: '#7C3AED', legendFontColor: '#4B5563', legendFontSize: 14 },
        { name: 'Beans', population: 30, color: '#F59E0B', legendFontColor: '#4B5563', legendFontSize: 14 },
        { name: 'Rice', population: 20, color: '#4B5563', legendFontColor: '#4B5563', legendFontSize: 14 },
      ],
      mySalesData: [
        { product: 'Maize', quantity: '25kg', amount: 'KSH 2,500' },
        { product: 'Beans', quantity: '15kg', amount: 'KSH 1,500' },
        { product: 'Rice', quantity: '10kg', amount: 'KSH 1,000' },
      ],
    },
  };

  // Select data based on userType
  const effectiveUserType = userType || 'employee'; // Fallback to employee
  const data = effectiveUserType === 'admin' ? mockData.admin : mockData.employee;

  const renderSummaryCard = (title, value, icon) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Icon name={icon} size={24} color="#7C3AED" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );

  const renderAdminTableRow = ({ product, revenue, percentage }) => (
    <View style={styles.tableRow} key={product}>
      <Text style={styles.tableCell}>{product}</Text>
      <Text style={styles.tableCell}>{revenue}</Text>
      <Text style={styles.tableCell}>{percentage}</Text>
    </View>
  );

  const renderEmployeeTableRow = ({ product, quantity, amount }) => (
    <View style={styles.tableRow} key={product}>
      <Text style={styles.tableCell}>{product}</Text>
      <Text style={styles.tableCell}>{quantity}</Text>
      <Text style={styles.tableCell}>{amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Debug userType */}
        <Text style={styles.debugText}>User Type: {effectiveUserType}</Text>

        {/* Welcome Message */}
        <Text style={styles.welcomeTitle}>Jambo, Limo’s Grocery!</Text>
        <Text style={styles.welcomeText}>Pata Faida na DukaPay! Monitor your shop’s performance.</Text>

        {/* Summary Cards */}
        <View style={styles.cardsContainer}>
          {effectiveUserType === 'admin' ? (
            <>
              {renderSummaryCard('Total Income', data.totalIncome, 'account-balance')}
              {renderSummaryCard('Business Revenues', data.businessRevenues, 'monetization-on')}
              {renderSummaryCard('Today’s Orders', data.todayOrders, 'shopping-cart')}
              {renderSummaryCard('Active Customers', data.activeCustomers, 'person')}
            </>
          ) : (
            <>
              {renderSummaryCard('My Sales', data.mySales, 'monetization-on')}
              {renderSummaryCard('Today’s Orders', data.todayOrders, 'shopping-cart')}
              {renderSummaryCard('Active Customers', data.activeCustomers, 'person')}
              {renderSummaryCard('Trending Products', data.trendingProducts, 'trending-up')}
            </>
          )}
        </View>

        {/* Sales Breakdown Pie Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>{effectiveUserType === 'admin' ? 'Daily Revenue Breakdown' : 'My Sales Breakdown'}</Text>
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
            data={data.pieData}
            width={screenWidth - 72}
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

        {/* Admin: Revenue Trend Line Chart, Employee: My Sales Table */}
        {effectiveUserType === 'admin' ? (
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Revenue Trend</Text>
              <RNPickerSelect
                onValueChange={(value) => setTrendingFilter(value)}
                items={[
                  { label: 'Day', value: 'Day' },
                  { label: 'Week', value: 'Week' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                style={pickerSelectStyles}
                value={trendingFilter}
                placeholder={{}}
                Icon={() => <Icon name="arrow-drop-down" size={24} color="#7C3AED" />}
              />
            </View>
            <LineChart
              data={data.revenueTrend}
              width={screenWidth - 72}
              height={200}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `#7C3AED`,
                labelColor: (opacity = 1) => `#4B5563`,
                style: { borderRadius: 12 },
                propsForDots: { r: '6', strokeWidth: '2', stroke: '#7C3AED' },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 12 }}
            />
          </View>
        ) : (
          <View style={styles.tableContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>My Sales</Text>
              <RNPickerSelect
                onValueChange={(value) => setTrendingFilter(value)}
                items={[
                  { label: 'Day', value: 'Day' },
                  { label: 'Week', value: 'Week' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                style={pickerSelectStyles}
                value={trendingFilter}
                placeholder={{}}
                Icon={() => <Icon name="arrow-drop-down" size={24} color="#7C3AED" />}
              />
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Product</Text>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
              <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>
            {data.mySalesData.map(renderEmployeeTableRow)}
          </View>
        )}

        {/* Admin: Top Products Table */}
        {effectiveUserType === 'admin' && (
          <View style={styles.tableContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Top Products by Revenue</Text>
              <RNPickerSelect
                onValueChange={(value) => setTrendingFilter(value)}
                items={[
                  { label: 'Day', value: 'Day' },
                  { label: 'Week', value: 'Week' },
                  { label: 'Monthly', value: 'Monthly' },
                ]}
                style={pickerSelectStyles}
                value={trendingFilter}
                placeholder={{}}
                Icon={() => <Icon name="arrow-drop-down" size={24} color="#7C3AED" />}
              />
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Product</Text>
              <Text style={styles.tableHeaderCell}>Revenue</Text>
              <Text style={styles.tableHeaderCell}>Percentage</Text>
            </View>
            {data.topProducts.map(renderAdminTableRow)}
          </View>
        )}
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
  debugText: {
    fontSize: 14,
    color: '#FF0000',
    marginBottom: 8,
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
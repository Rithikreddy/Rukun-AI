import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ArrowUp, ArrowDown, DollarSign, Users } from 'lucide-react-native';
import { useState } from 'react';

interface BalanceData {
  totalOwed: number;
  totalOwing: number;
  netBalance: number;
}

interface RecentActivity {
  id: string;
  type: 'expense' | 'payment';
  description: string;
  amount: number;
  group: string;
  date: string;
}

export default function DashboardScreen() {
  const [balance] = useState<BalanceData>({
    totalOwed: 156.50,
    totalOwing: 89.25,
    netBalance: 67.25,
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'expense',
      description: 'Dinner at Italian Restaurant',
      amount: 85.50,
      group: 'Weekend Trip',
      date: '2 hours ago',
    },
    {
      id: '2',
      type: 'payment',
      description: 'Payment from Sarah',
      amount: 42.75,
      group: 'Apartment Rent',
      date: '1 day ago',
    },
    {
      id: '3',
      type: 'expense',
      description: 'Grocery Shopping',
      amount: 127.30,
      group: 'Roommates',
      date: '3 days ago',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Alex!</Text>
          <Text style={styles.subtitle}>Here's your expense summary</Text>
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceIcon}>
              <ArrowDown size={20} color="#10B981" strokeWidth={2} />
            </View>
            <Text style={styles.balanceLabel}>You are owed</Text>
            <Text style={styles.balanceAmount}>+${balance.totalOwed.toFixed(2)}</Text>
          </View>

          <View style={styles.balanceCard}>
            <View style={[styles.balanceIcon, { backgroundColor: '#FEF2F2' }]}>
              <ArrowUp size={20} color="#EF4444" strokeWidth={2} />
            </View>
            <Text style={styles.balanceLabel}>You owe</Text>
            <Text style={[styles.balanceAmount, { color: '#EF4444' }]}>
              -${balance.totalOwing.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Net Balance */}
        <View style={styles.netBalanceCard}>
          <DollarSign size={24} color="#10B981" strokeWidth={2} />
          <View style={styles.netBalanceContent}>
            <Text style={styles.netBalanceLabel}>Your net balance</Text>
            <Text style={[
              styles.netBalanceAmount,
              { color: balance.netBalance >= 0 ? '#10B981' : '#EF4444' }
            ]}>
              {balance.netBalance >= 0 ? '+' : ''}${balance.netBalance.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={24} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}>
              <Users size={24} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.actionText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityItem}>
              <View style={[
                styles.activityIcon,
                { backgroundColor: activity.type === 'expense' ? '#FEF2F2' : '#F0FDF4' }
              ]}>
                {activity.type === 'expense' ? (
                  <ArrowUp size={18} color="#EF4444" strokeWidth={2} />
                ) : (
                  <ArrowDown size={18} color="#10B981" strokeWidth={2} />
                )}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityGroup}>{activity.group} • {activity.date}</Text>
              </View>
              <Text style={[
                styles.activityAmount,
                { color: activity.type === 'expense' ? '#EF4444' : '#10B981' }
              ]}>
                {activity.type === 'expense' ? '-' : '+'}${activity.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  balanceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10B981',
  },
  netBalanceCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 24,
  },
  netBalanceContent: {
    marginLeft: 16,
    flex: 1,
  },
  netBalanceLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  netBalanceAmount: {
    fontSize: 28,
    fontWeight: '700',
  },
  quickActions: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recentActivity: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 2,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityGroup: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activityAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
});
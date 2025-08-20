import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, DollarSign, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

interface Group {
  id: string;
  name: string;
  members: string[];
  totalExpenses: number;
  yourBalance: number;
  lastActivity: string;
  color: string;
}

export default function GroupsScreen() {
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Weekend Trip',
      members: ['You', 'Sarah', 'Mike', 'Emma'],
      totalExpenses: 487.25,
      yourBalance: -23.50,
      lastActivity: '2 hours ago',
      color: '#3B82F6',
    },
    {
      id: '2',
      name: 'Roommates',
      members: ['You', 'Mike', 'John'],
      totalExpenses: 1250.80,
      yourBalance: 89.30,
      lastActivity: '1 day ago',
      color: '#10B981',
    },
    {
      id: '3',
      name: 'Work Lunch Group',
      members: ['You', 'Sarah', 'David', 'Lisa', 'Tom'],
      totalExpenses: 234.60,
      yourBalance: 12.75,
      lastActivity: '3 days ago',
      color: '#F97316',
    },
    {
      id: '4',
      name: 'Monthly Groceries',
      members: ['You', 'Emma'],
      totalExpenses: 678.90,
      yourBalance: -45.20,
      lastActivity: '1 week ago',
      color: '#8B5CF6',
    },
  ]);

  const getBalanceColor = (balance: number) => {
    return balance >= 0 ? '#10B981' : '#EF4444';
  };

  const getBalanceText = (balance: number) => {
    if (balance > 0) {
      return `You are owed $${balance.toFixed(2)}`;
    } else if (balance < 0) {
      return `You owe $${Math.abs(balance).toFixed(2)}`;
    } else {
      return 'All settled up';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Groups List */}
      <ScrollView style={styles.groupsList} showsVerticalScrollIndicator={false}>
        {groups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
                <Users size={24} color="#FFFFFF" strokeWidth={2} />
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.membersInfo}>
                  <Text style={styles.membersCount}>{group.members.length} members</Text>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.lastActivity}>{group.lastActivity}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </View>

            <View style={styles.groupStats}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <DollarSign size={16} color="#6B7280" strokeWidth={2} />
                </View>
                <View>
                  <Text style={styles.statLabel}>Total expenses</Text>
                  <Text style={styles.statValue}>${group.totalExpenses.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.balanceContainer}>
                <Text style={[styles.balanceText, { color: getBalanceColor(group.yourBalance) }]}>
                  {getBalanceText(group.yourBalance)}
                </Text>
              </View>
            </View>

            <View style={styles.membersPreview}>
              <Text style={styles.membersLabel}>Members:</Text>
              <Text style={styles.membersList}>
                {group.members.slice(0, 3).join(', ')}
                {group.members.length > 3 && ` +${group.members.length - 3} more`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Create New Group Card */}
        <TouchableOpacity style={styles.createGroupCard}>
          <View style={styles.createGroupContent}>
            <View style={styles.createGroupIcon}>
              <Plus size={32} color="#10B981" strokeWidth={2} />
            </View>
            <Text style={styles.createGroupTitle}>Create New Group</Text>
            <Text style={styles.createGroupSubtitle}>
              Start splitting expenses with friends and family
            </Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  groupsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  membersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  separator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  lastActivity: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  groupStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  membersPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 8,
  },
  membersList: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
  },
  createGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
  },
  createGroupContent: {
    alignItems: 'center',
  },
  createGroupIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  createGroupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  createGroupSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
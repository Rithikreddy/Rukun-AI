import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, Calendar, MapPin } from 'lucide-react-native';
import { useState } from 'react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  group: string;
  date: string;
  splitBetween: string[];
  category: string;
  location?: string;
}

export default function ExpensesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Dinner at Mario\'s Pizza',
      amount: 85.50,
      paidBy: 'You',
      group: 'Weekend Trip',
      date: 'Today',
      splitBetween: ['You', 'Sarah', 'Mike'],
      category: 'Food & Dining',
      location: 'Downtown',
    },
    {
      id: '2',
      description: 'Gas for Road Trip',
      amount: 67.25,
      paidBy: 'Sarah',
      group: 'Weekend Trip',
      date: 'Yesterday',
      splitBetween: ['You', 'Sarah', 'Mike'],
      category: 'Transportation',
    },
    {
      id: '3',
      description: 'Grocery Shopping',
      amount: 127.30,
      paidBy: 'Mike',
      group: 'Roommates',
      date: '3 days ago',
      splitBetween: ['You', 'Mike', 'John'],
      category: 'Groceries',
    },
    {
      id: '4',
      description: 'Movie Tickets',
      amount: 42.00,
      paidBy: 'You',
      group: 'Friends',
      date: '1 week ago',
      splitBetween: ['You', 'Sarah', 'Emma', 'David'],
      category: 'Entertainment',
    },
  ]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food & Dining': '#F97316',
      'Transportation': '#3B82F6',
      'Groceries': '#10B981',
      'Entertainment': '#8B5CF6',
      'Utilities': '#06B6D4',
      'Shopping': '#EC4899',
    };
    return colors[category] || '#6B7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search expenses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Expense List */}
      <ScrollView style={styles.expenseList} showsVerticalScrollIndicator={false}>
        {expenses.map((expense) => (
          <TouchableOpacity key={expense.id} style={styles.expenseCard}>
            <View style={styles.expenseHeader}>
              <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(expense.category) }]} />
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseDescription}>{expense.description}</Text>
                <Text style={styles.expenseDetails}>
                  Paid by {expense.paidBy} • {expense.group}
                </Text>
              </View>
              <View style={styles.expenseAmount}>
                <Text style={styles.amountText}>${expense.amount.toFixed(2)}</Text>
                <Text style={styles.dateText}>{expense.date}</Text>
              </View>
            </View>

            <View style={styles.expenseMeta}>
              <View style={styles.metaItem}>
                <Calendar size={14} color="#6B7280" strokeWidth={2} />
                <Text style={styles.metaText}>{expense.category}</Text>
              </View>
              {expense.location && (
                <View style={styles.metaItem}>
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.metaText}>{expense.location}</Text>
                </View>
              )}
            </View>

            <View style={styles.splitInfo}>
              <Text style={styles.splitText}>
                Split between {expense.splitBetween.length} people
              </Text>
              <Text style={styles.yourShare}>
                Your share: ${(expense.amount / expense.splitBetween.length).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  expenseCard: {
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
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 6,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  expenseDetails: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  expenseAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  expenseMeta: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  splitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  splitText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  yourShare: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
});
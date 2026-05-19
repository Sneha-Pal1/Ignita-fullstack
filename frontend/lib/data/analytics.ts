// Mock Analytics Data for Ignita

export interface ActivityData {
  date: string;
  count: number;
  intensity: 'none' | 'low' | 'medium' | 'high' | 'very-high';
}

export interface MonthlyData {
  month: string;
  bookmarks: number;
  events: number;
  alerts: number;
  posts: number;
}

export interface CategoryData {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface InsightCard {
  id: string;
  title: string;
  icon: string;
  highlight: string;
  color: string;
}

export interface ActivityFeedItem {
  id: string;
  action: 'bookmark' | 'alert' | 'post' | 'register';
  title: string;
  timestamp: string;
  details?: string;
}

export interface GoalData {
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

// Generate activity heatmap data - 365 days
export const generateActivityHeatmap = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Weighted random activity (bias towards weekdays)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseWeight = isWeekend ? 0.6 : 0.9;

    const random = Math.random();
    const weightedRandom = Math.pow(random, 2 - baseWeight);
    let intensity: ActivityData['intensity'] = 'none';

    if (weightedRandom > 0.75) intensity = 'very-high';
    else if (weightedRandom > 0.55) intensity = 'high';
    else if (weightedRandom > 0.35) intensity = 'medium';
    else if (weightedRandom > 0.15) intensity = 'low';

    const countMap = {
      none: 0,
      low: Math.floor(Math.random() * 2) + 1,
      medium: Math.floor(Math.random() * 4) + 2,
      high: Math.floor(Math.random() * 6) + 5,
      'very-high': Math.floor(Math.random() * 8) + 8,
    };

    data.push({
      date: date.toISOString().split('T')[0],
      count: countMap[intensity],
      intensity,
    });
  }

  return data;
};

// Monthly activity data
export const monthlyActivityData: MonthlyData[] = [
  { month: 'Jan', bookmarks: 12, events: 8, alerts: 5, posts: 3 },
  { month: 'Feb', bookmarks: 18, events: 12, alerts: 7, posts: 4 },
  { month: 'Mar', bookmarks: 24, events: 16, alerts: 9, posts: 6 },
  { month: 'Apr', bookmarks: 32, events: 20, alerts: 12, posts: 8 },
  { month: 'May', bookmarks: 28, events: 18, alerts: 11, posts: 7 },
  { month: 'Jun', bookmarks: 36, events: 24, alerts: 14, posts: 9 },
];

// Event categories breakdown
export const categoryData: CategoryData[] = [
  { name: 'Web Development', percentage: 28, count: 24, color: 'emerald' },
  { name: 'AI & Machine Learning', percentage: 22, count: 19, color: 'blue' },
  { name: 'Hackathons', percentage: 18, count: 15, color: 'purple' },
  { name: 'Open Source', percentage: 15, count: 13, color: 'cyan' },
  { name: 'Internships', percentage: 12, count: 10, color: 'amber' },
  { name: 'Workshops', percentage: 5, count: 4, color: 'rose' },
];

// Productivity insights
export const insightCards: InsightCard[] = [
  {
    id: 'peak-activity',
    title: 'Peak Activity Time',
    icon: '⏰',
    highlight: 'Weekday Evenings',
    color: 'emerald',
  },
  {
    id: 'favorite-category',
    title: 'Top Interest',
    icon: '🎯',
    highlight: 'Web Development',
    color: 'blue',
  },
  {
    id: 'monthly-growth',
    title: 'Monthly Growth',
    icon: '📈',
    highlight: '+24%',
    color: 'emerald',
  },
  {
    id: 'engagement-streak',
    title: 'Current Streak',
    icon: '🔥',
    highlight: '7 Days',
    color: 'amber',
  },
];

// Recent activity feed
export const activityFeed: ActivityFeedItem[] = [
  {
    id: '1',
    action: 'bookmark',
    title: 'React 19 Release: New Features',
    timestamp: '2 hours ago',
    details: 'Web Development',
  },
  {
    id: '2',
    action: 'alert',
    title: 'New AI Hackathon Alert',
    timestamp: '5 hours ago',
    details: 'Hackathons, AI',
  },
  {
    id: '3',
    action: 'post',
    title: 'Generated LinkedIn Post about Web Dev',
    timestamp: '1 day ago',
    details: 'LinkedIn',
  },
  {
    id: '4',
    action: 'register',
    title: 'Registered for Open Source Summit',
    timestamp: '2 days ago',
    details: 'Open Source, Workshop',
  },
  {
    id: '5',
    action: 'bookmark',
    title: 'Advanced TypeScript Patterns',
    timestamp: '3 days ago',
    details: 'Web Development',
  },
  {
    id: '6',
    action: 'alert',
    title: 'Internship Application Deadline',
    timestamp: '5 days ago',
    details: 'Internships',
  },
];

// Goals and streaks
export const goalsData: GoalData[] = [
  {
    title: 'Save Events This Month',
    current: 28,
    target: 40,
    unit: 'events',
    progress: 70,
  },
  {
    title: 'Generate LinkedIn Posts',
    current: 7,
    target: 10,
    unit: 'posts',
    progress: 70,
  },
  {
    title: 'Active Days',
    current: 24,
    target: 30,
    unit: 'days',
    progress: 80,
  },
];

// Stats overview cards data
export const statsData = [
  {
    label: 'Events Saved',
    value: '248',
    change: '+12',
    changePercent: '+5.1%',
    icon: '📌',
  },
  {
    label: 'Events Applied',
    value: '18',
    change: '+3',
    changePercent: '+20%',
    icon: '✨',
  },
  {
    label: 'Active Alerts',
    value: '12',
    change: '+2',
    changePercent: '+20%',
    icon: '🔔',
  },
  {
    label: 'LinkedIn Posts',
    value: '24',
    change: '+4',
    changePercent: '+20%',
    icon: '💼',
  },
  {
    label: 'Productivity Score',
    value: '84/100',
    change: '+8',
    changePercent: '+10.5%',
    icon: '⚡',
  },
  {
    label: 'Active Streak',
    value: '7 days',
    change: 'Continue!',
    changePercent: 'Keep it up!',
    icon: '🔥',
  },
];

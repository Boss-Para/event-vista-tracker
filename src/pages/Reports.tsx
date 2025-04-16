
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

// Mock data for reports
const monthlyData = [
  { name: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { name: "Feb", revenue: 15000, expenses: 9000, profit: 6000 },
  { name: "Mar", revenue: 18000, expenses: 12000, profit: 6000 },
  { name: "Apr", revenue: 20000, expenses: 13000, profit: 7000 },
  { name: "May", revenue: 25000, expenses: 15000, profit: 10000 },
  { name: "Jun", revenue: 30000, expenses: 18000, profit: 12000 },
];

const eventTypeData = [
  { name: "Wedding", value: 45 },
  { name: "Corporate", value: 30 },
  { name: "Birthday", value: 15 },
  { name: "Conference", value: 10 },
];

const COLORS = ["#9b87f5", "#7E69AB", "#e5deff", "#6E59A5"];

const vendorPerformanceData = [
  { name: "Elegant Decor", performance: 92 },
  { name: "Gourmet Catering", performance: 88 },
  { name: "Sound Masters", performance: 76 },
  { name: "Perfect Photos", performance: 95 },
  { name: "Sweet Bakery", performance: 84 },
  { name: "Event Transport", performance: 79 },
];

const Reports = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">View insights about your events and business</p>
      </div>

      <Tabs defaultValue="financials">
        <TabsList className="mb-6">
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Expenses</CardTitle>
              <CardDescription>Monthly financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#9b87f5" name="Revenue" />
                    <Bar dataKey="expenses" fill="#7E69AB" name="Expenses" />
                    <Bar dataKey="profit" fill="#e5deff" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
                <CardDescription>Distribution by event category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Events</CardTitle>
                <CardDescription>Number of events over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#9b87f5"
                        activeDot={{ r: 8 }}
                        name="Events"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
              <CardDescription>Satisfaction ratings for top vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={vendorPerformanceData}
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#9b87f5" name="Performance Score">
                      {vendorPerformanceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.performance > 90 ? "#4CAF50" : entry.performance > 80 ? "#9b87f5" : "#FF9800"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;

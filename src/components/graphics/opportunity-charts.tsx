import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stateData = [
  { name: "Apertura", value: 50, color: "#2196F3" },
  { name: "Orden de Compra", value: 25, color: "#00E5B1" },
  { name: "Ejecutada", value: 25, color: "#FFB74D" },
]

const businessLineData = [
  { name: "Consultoría TI", value: 25, color: "#2196F3" },
  { name: "Outsourcing recursos", value: 25, color: "#00E5B1" },
  { name: "Desarrollo web", value: 25, color: "#FFB74D" },
  { name: "Desarrollo mobile", value: 25, color: "#FF7043" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-semibold">{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function OpportunityCharts() {
  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Total de Oportunidades por Estado</CardTitle>
          <CardDescription>Distribución de oportunidades según su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Porcentaje de Oportunidades por Linea de Negocio</CardTitle>
          <CardDescription>Distribución de oportunidades por área de negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={businessLineData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {businessLineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}


import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

// Nueva gráfica: Publicaciones creadas en el último mes
const postsLastMonth = [
  { week: 'Semana 1', posts: 14 },
  { week: 'Semana 2', posts: 21 },
  { week: 'Semana 3', posts: 17 },
  { week: 'Semana 4', posts: 25 },
];

const usersLastWeek = [
  { day: 'Lun', users: 12 },
  { day: 'Mar', users: 18 },
  { day: 'Mié', users: 22 },
  { day: 'Jue', users: 15 },
  { day: 'Vie', users: 25 },
  { day: 'Sáb', users: 30 },
  { day: 'Dom', users: 20 },
];

const popularityLastMonth = [
  { week: 'Semana 1', visitas: 120 },
  { week: 'Semana 2', visitas: 180 },
  { week: 'Semana 3', visitas: 220 },
  { week: 'Semana 4', visitas: 300 },
];

const usersByAge = [
  { name: '18-24', value: 120 },
  { name: '25-34', value: 200 },
  { name: '35-44', value: 150 },
  { name: '45-54', value: 80 },
  { name: '55+', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const resumen = [
  { label: 'Nuevos usuarios (semana)', value: 142 },
  { label: 'Usuarios totales', value: 1500 },
  { label: 'Visitas este mes', value: 820 },
];

const AdminDashBoard = () => {
  return (
    <div className="w-full min-h-screen px-4 py-6">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Panel de Administración</h1>
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {resumen.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-6 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{item.value}</span>
              <span className="text-gray-600 dark:text-gray-300 mt-2 text-center">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Usuarios registrados en la última semana */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Usuarios registrados en la última semana</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usersLastWeek}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#0088FE" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Popularidad de la plataforma en el último mes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Popularidad de la plataforma (visitas/actividad - último mes)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={popularityLastMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitas" stroke="#00C49F" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Distribución de usuarios por edad */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Usuarios por rango de edad</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={usersByAge}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {usersByAge.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Nueva gráfica: Publicaciones creadas en el último mes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Publicaciones creadas en el último mes</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={postsLastMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#FF8042" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
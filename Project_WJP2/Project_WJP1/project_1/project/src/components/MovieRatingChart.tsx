import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Movie {
  id: number;
  title: string;
  averageRating: number;
}

const MovieRatingChart: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies')
      .then(response => {
        const moviesWithAvgRating = response.data.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          averageRating: movie.averageRating || 0,
        }));
        setData(moviesWithAvgRating);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Movie Ratings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" angle={-45} textAnchor="end" interval={0} height={80} />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Bar dataKey="averageRating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MovieRatingChart;

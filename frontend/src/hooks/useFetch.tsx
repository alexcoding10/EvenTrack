import { useState, useEffect } from 'react';

export const useFetch = (url: string, method: string = 'GET', body: any = "") => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json', // Aseguramos que los datos enviados sean JSON
          },
        };

        // Solo agregamos el cuerpo si no es una solicitud GET
        if (method !== 'GET' && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]); // Se vuelve a ejecutar si cambian la URL, método o body

  return { data, loading, error };
};

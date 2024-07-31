import React from 'react';

interface Data {
  message: string;
}

const fetchData = (): Promise<Data> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Hello from the async world!' });
    }, 2000); 
  });

const DataDisplayComponent: React.FC = () => {
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    fetchData().then((result) => {
      if (isMounted) setData(result);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) {
    throw new Promise(() => {});
  }

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
};

export default DataDisplayComponent;

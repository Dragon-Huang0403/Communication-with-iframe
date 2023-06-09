import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { broadcastChannel } from '@/utils/constants';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const channel = new BroadcastChannel(broadcastChannel);
    const updateItems = (event: MessageEvent) => {
      console.log(event);
      if (typeof event.data === 'number') {
        setItems((prev) => [...prev, event.data]);
      }
    };

    channel.addEventListener('message', updateItems);

    return () => {
      channel.removeEventListener('message', updateItems);
      channel.close();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Communication with iframe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: '20px' }}>
        <h1>Communication with iframe</h1>
        <div>
          {items.length === 0 ? (
            <span>Click iframe Buttons</span>
          ) : (
            <span>{`You have clicked ${items.join(', ')}`}</span>
          )}
        </div>
        <iframe
          src="/child"
          style={{
            border: '1px solid blue',
            margin: '10px 10px',
            height: '500px',
            width: '500px',
          }}
        ></iframe>
      </div>
    </>
  );
}

import { broadcastChannel } from '@/utils/constants';
import React, { useEffect, useRef } from 'react';

function ChildPage() {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(broadcastChannel);
    return () => {
      channelRef.current?.close();
    };
  }, []);

  const handleClick = (message: number) => {
    channelRef.current?.postMessage(message);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        color: 'black',
        display: 'grid',
        gap: '10px',
        padding: '20px',
      }}
    >
      <h2>This is a iframe</h2>
      {Array(10)
        .fill('')
        .map((_, i) => (
          <button
            key={i}
            onClick={() => {
              handleClick(i + 1);
            }}
          >{`Button ${i + 1}`}</button>
        ))}
    </div>
  );
}

export default ChildPage;

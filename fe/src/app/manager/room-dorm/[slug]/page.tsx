import * as React from 'react';

export interface IRoomDormDetailProps {
    params: {slug:number}
}

export default function RoomDormDetail ({params:{slug}}: IRoomDormDetailProps) {
  return (
    <div>
      {slug}
    </div>
  );
}

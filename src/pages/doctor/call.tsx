import dynamic from 'next/dynamic';
import React from 'react'

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Call = () => {
  return <ManagerLayoutNoSSR content={<div>Call</div>} />;
}

export default Call
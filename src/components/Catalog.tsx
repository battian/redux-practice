import React from 'react';

import { products } from '../services/server.json';

import CatalogItem from './CatalogItem';

const Catalog: React.FC = () => {
  return (
    <main>
      <h1>Catalog</h1>

      {products.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </main>
  );
};

export default Catalog;

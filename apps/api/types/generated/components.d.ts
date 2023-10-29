import type { Schema, Attribute } from '@strapi/strapi';

export interface AdditionalDataPostSeo extends Schema.Component {
  collectionName: 'components_additional_data_post_seos';
  info: {
    displayName: 'SEO';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 155;
      }>;
    shareImage: Attribute.Media & Attribute.Required;
    keywords: Attribute.String & Attribute.Required;
  };
}

export interface ProductsPrice extends Schema.Component {
  collectionName: 'components_products_prices';
  info: {
    displayName: 'Price';
    icon: 'priceTag';
  };
  attributes: {
    currency: Attribute.Enumeration<['pounds', 'euros', 'dollars']> &
      Attribute.Required &
      Attribute.DefaultTo<'pounds'>;
    value: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 4;
      }> &
      Attribute.DefaultTo<'0.00'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'additional-data.post-seo': AdditionalDataPostSeo;
      'products.price': ProductsPrice;
    }
  }
}

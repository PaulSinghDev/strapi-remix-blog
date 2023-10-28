import type { Schema, Attribute } from '@strapi/strapi';

export interface AdditionalDataPostSeo extends Schema.Component {
  collectionName: 'components_additional_data_post_seos';
  info: {
    displayName: 'SEO';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 155;
      }>;
    ShareImage: Attribute.Media & Attribute.Required;
    Keywords: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'additional-data.post-seo': AdditionalDataPostSeo;
    }
  }
}

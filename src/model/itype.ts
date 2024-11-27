/** @format */

export interface HomePageNFT {
  data: {
    type?: string;
    version: string;
    content: HPContent;
    digest: string;
    objectId: string;
    display: HPDisplay;
  };
}

export interface HPContent {
  dataType: string;
  fields: HPContentField;
  hasPublicTransfer: string;
  type: string;
}

export interface HPDisplay {
  data: HPDisplayData;
  error?: any;
}

export interface HPContentField {
  description: string;
  id: { id: string };
  img_url: string;
  name: string;
}

export interface HPDisplayData {
  creator: string;
  description: string;
  image_url: string;
  name: string;
  project_url: string;
}

export interface DialogboxTableData {
  whitelist: any[];
  max_counts: any[];
  start_times: any[];
  end_times: any[];
  allow_counts: any[];
  prices: any[];
}

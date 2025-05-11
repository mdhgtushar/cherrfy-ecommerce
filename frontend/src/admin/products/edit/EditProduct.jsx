import React, { useState } from 'react';

const EditProduct = ({ initialData }) => {
    initialData = {
        "ae_item_sku_info_dtos": {
            "ae_item_sku_info_d_t_o": [
                {
                    "sku_attr": "14:200005100#984 Gold Blue",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3373,
                    "sku_stock": true,
                    "sku_id": "12000044382493157",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3373,
                    "id": "14:200005100#984 Gold Blue",
                    "sku_code": "14:200005100",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Coffee",
                                "sku_image": "https://ae01.alicdn.com/kf/S9eeceeaee24949febebb898c754faa4aF.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Gold Blue",
                                "property_value_id": 200005100,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:201447303#984 Gold Black",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3387,
                    "sku_stock": true,
                    "sku_id": "12000044382493156",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3387,
                    "id": "14:201447303#984 Gold Black",
                    "sku_code": "14:201447303",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Rose",
                                "sku_image": "https://ae01.alicdn.com/kf/S68e7cf4742de43d79afa4c7f6ce65484o.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Gold Black",
                                "property_value_id": 201447303,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:100013777#984 Gold Gold",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3387,
                    "sku_stock": true,
                    "sku_id": "12000044382493159",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3387,
                    "id": "14:100013777#984 Gold Gold",
                    "sku_code": "14:100013777",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Pink",
                                "sku_image": "https://ae01.alicdn.com/kf/Sd01b1c6ebf5743c2bee7152a1b3105ccv.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Gold Gold",
                                "property_value_id": 100013777,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:200000080#984 Gold Green",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3414,
                    "sku_stock": true,
                    "sku_id": "12000044382493158",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3414,
                    "id": "14:200000080#984 Gold Green",
                    "sku_code": "14:200000080",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Multicolor",
                                "sku_image": "https://ae01.alicdn.com/kf/Sabb6e7ef489f47a19e5283a0c8b64d51b.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Gold Green",
                                "property_value_id": 200000080,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:201447598#984 Gold White",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3327,
                    "sku_stock": true,
                    "sku_id": "12000044382493155",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3327,
                    "id": "14:201447598#984 Gold White",
                    "sku_code": "14:201447598",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "BRONZE",
                                "sku_image": "https://ae01.alicdn.com/kf/S748a46f75309436888dfe8eaca09495dc.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Gold White",
                                "property_value_id": 201447598,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:350686#984 Silver White",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3404,
                    "sku_stock": true,
                    "sku_id": "12000044382493161",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3404,
                    "id": "14:350686#984 Silver White",
                    "sku_code": "14:350686",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Brown",
                                "sku_image": "https://ae01.alicdn.com/kf/S135385fab23a409a8822cf8e156856c7f.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Silver White",
                                "property_value_id": 350686,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:100005979#984 Black Black",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3348,
                    "sku_stock": true,
                    "sku_id": "12000044382493160",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3348,
                    "id": "14:100005979#984 Black Black",
                    "sku_code": "14:100005979",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Ivory",
                                "sku_image": "https://ae01.alicdn.com/kf/S47728b44a14f491da9c6d2b7d56f0619R.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Black Black",
                                "property_value_id": 100005979,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:350853#984 Silver Blue",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3411,
                    "sku_stock": true,
                    "sku_id": "12000044382493163",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3411,
                    "id": "14:350853#984 Silver Blue",
                    "sku_code": "14:350853",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Silver",
                                "sku_image": "https://ae01.alicdn.com/kf/S30c1c6b398e341e4ad9adee703e084c54.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Silver Blue",
                                "property_value_id": 350853,
                                "sku_property_id": 14
                            }
                        ]
                    }
                },
                {
                    "sku_attr": "14:350850#984 Silver Black",
                    "offer_sale_price": "17.50",
                    "ipm_sku_stock": 3409,
                    "sku_stock": true,
                    "sku_id": "12000044382493162",
                    "price_include_tax": false,
                    "currency_code": "USD",
                    "sku_price": "175.01",
                    "offer_bulk_sale_price": "17.50",
                    "sku_available_stock": 3409,
                    "id": "14:350850#984 Silver Black",
                    "sku_code": "14:350850",
                    "ae_sku_property_dtos": {
                        "ae_sku_property_d_t_o": [
                            {
                                "sku_property_value": "Gold",
                                "sku_image": "https://ae01.alicdn.com/kf/Se857def2f0024b3ca27c7cf02850c22cO.jpg",
                                "sku_property_name": "Color",
                                "property_value_definition_name": "984 Silver Black",
                                "property_value_id": 350850,
                                "sku_property_id": 14
                            }
                        ]
                    }
                }
            ]
        },
        "ae_multimedia_info_dto": {
            "ae_video_dtos": {
                "ae_video_d_t_o": [
                    {
                        "media_status": "approved",
                        "media_type": "video",
                        "poster_url": "https://ae01.alicdn.com/kf/S8a9a94cb27324d2b996ec3a5d0bcd0805.jpg",
                        "ali_member_id": 2677179010,
                        "media_id": 5000209550464,
                        "media_url": "https://video.aliexpress-media.com/play/5000209550464.mp4"
                    }
                ]
            },
            "image_urls": "https://ae01.alicdn.com/kf/S6809b8fa34214bedb12195a8f76606dcr.jpg;https://ae01.alicdn.com/kf/S0b2dc9db59e5492197d7d21b94a7ec46m.jpg;https://ae01.alicdn.com/kf/S5e3a8e64c2fd404cb562e958f3894cfdv.jpg;https://ae01.alicdn.com/kf/Sab8f0c9628194e97a31978bd76ddd381Q.jpg;https://ae01.alicdn.com/kf/S38cb1d76b50545a889dd5b812c6b6aa8v.jpg;https://ae01.alicdn.com/kf/S8dad26ddbdf2486f8f70bcd9b814fd1eu.jpg"
        },
        "package_info_dto": {
            "package_width": 14,
            "package_height": 8,
            "package_length": 15,
            "gross_weight": "0.160",
            "package_type": false,
            "product_unit": 100000015
        },
        "logistics_info_dto": {
            "delivery_time": 7,
            "ship_to_country": "bd"
        },
        "product_id_converter_result": {
            "main_product_id": 1005008252021087,
            "sub_product_id": "{\"US\":3256808065706335}"
        },
        "ae_item_base_info_dto": {
            "mobile_detail": "{\"version\":\"2.0.0\",\"moduleList\":[{\"type\":\"text\",\"data\":{\"content\":\"Package Included:\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"1 x POEDAGAR Clock\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"1 x POEDAGAR Box\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"1 x Watchband adjust tool\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"1 x Watch wipe\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"1 x Warranty card\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"After-Sales Service:\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"text\",\"data\":{\"content\":\"If you have any questions, please contact us by email, we will try our best to deal with it for you.We will reply within 24 hours.\",\"style\":{\"paddingLeft\":16,\"paddingRight\":16,\"paddingTop\":10,\"paddingBottom\":10,\"fontSize\":14,\"fontWeight\":\"regular\",\"align\":\"left\",\"color\":\"#666666\",\"fontFamily\":\"OpenSans\",\"backgroundColor\":\"#FFFFFF\"}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S44ab74493f7e408ba55d8e37be2ba30eF.jpg\",\"style\":{\"width\":1000,\"height\":1105}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sea7edc918828411e81cd137d27552b42Z.jpg\",\"style\":{\"width\":1600,\"height\":2711}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S8033d23406c34b809806a22f061c354dj.jpg\",\"style\":{\"width\":1600,\"height\":1679}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sb311134db65846369c461eda552822d3f.jpg\",\"style\":{\"width\":1600,\"height\":2600}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S3aee9425c7294618957fed11bc5ae131s.jpg\",\"style\":{\"width\":1600,\"height\":2437}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Se2a37f59d57b4c0d9c86e9319bc1f762s.jpg\",\"style\":{\"width\":1600,\"height\":2600}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sd76df6d18d954cc9a9083562f9e9a026T.jpg\",\"style\":{\"width\":1600,\"height\":2621}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sf5c0c9df31334b218310c7286c262516D.jpg\",\"style\":{\"width\":1600,\"height\":1706}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S182a2329f44e4ed5ba8b9ce000c7d524i.jpg\",\"style\":{\"width\":1600,\"height\":3453}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S694db0c94fc1424e8cc51e243ed1dc39G.jpg\",\"style\":{\"width\":1600,\"height\":2354}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/See00effbc88144df810c9c6e7de052020.jpg\",\"style\":{\"width\":1600,\"height\":2250}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S6b008e16b6f84a19b039d349cb940c8dr.jpg\",\"style\":{\"width\":1600,\"height\":2250}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sf78545c77dea43ad807ec6b7873514cbq.jpg\",\"style\":{\"width\":1600,\"height\":2600}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S9cba692a2a954c8893ea7abc3767f6cfi.jpg\",\"style\":{\"width\":1600,\"height\":2438}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sd0fb13dff7c9440fb08fd51aaec0046ek.jpg\",\"style\":{\"width\":1600,\"height\":2000}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S2cddd6addc054e818f9d87d22827bc46D.jpg\",\"style\":{\"width\":1600,\"height\":2453}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Sd3e47b62ff3a43a88c76ad62d2e87310a.jpg\",\"style\":{\"width\":950,\"height\":1886}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S45b039ccd31749e59f49dd396719179ax.jpg\",\"style\":{\"width\":1000,\"height\":2402}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/S5e688d9f1f9f4baf9596f502dbd5ba2aT.jpg\",\"style\":{\"width\":1000,\"height\":2696}}},{\"type\":\"image\",\"data\":{\"url\":\"https://ae01.alicdn.com/kf/Se452c2cdbf8d4cacaf15ec49e3534aaeZ.jpg\",\"style\":{\"width\":1000,\"height\":1872}}}]}",
            "subject": "POEDAGAR Luxury Fashion Men Watch Waterproof Luminous Date Man Wristwatch Stainless Steel Chronograph Quartz Men's Watches Reloj",
            "evaluation_count": "92",
            "sales_count": "481",
            "product_status_type": "onSelling",
            "avg_evaluation_rating": "4.6",
            "currency_code": "CNY",
            "category_id": 200034143,
            "product_id": 1005008252021087,
            "detail": "<p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\"><span style=\"font-size:16px\"><strong>Package Included:</strong></span></p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">1 x POEDAGAR Clock</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">1 x POEDAGAR Box</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">1 x Watchband adjust tool</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">1 x Watch wipe</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">1 x Warranty card</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\"><span style=\"font-size:16px\"><strong>After-Sales Service:</strong></span></p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\">If you have any questions, please contact us by email, we will try our best to deal with it for you.We will reply within 24 hours.</p><p style=\"font-family:&quot;TT Norms Pro&quot;, &quot;Open Sans&quot;, Roboto, Arial, Helvetica, sans-serif, SimSun;font-size:14px;font-weight:400;letter-spacing:normal;line-height:inherit;text-align:start;white-space:normal;color:rgb(34, 34, 34);margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px;padding:0px;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;box-sizing:border-box\" align=\"start\"><img src=\"https://ae01.alicdn.com/kf/S44ab74493f7e408ba55d8e37be2ba30eF.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sea7edc918828411e81cd137d27552b42Z.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S8033d23406c34b809806a22f061c354dj.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sb311134db65846369c461eda552822d3f.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S3aee9425c7294618957fed11bc5ae131s.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Se2a37f59d57b4c0d9c86e9319bc1f762s.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sd76df6d18d954cc9a9083562f9e9a026T.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sf5c0c9df31334b218310c7286c262516D.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S182a2329f44e4ed5ba8b9ce000c7d524i.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S694db0c94fc1424e8cc51e243ed1dc39G.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/See00effbc88144df810c9c6e7de052020.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S6b008e16b6f84a19b039d349cb940c8dr.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sf78545c77dea43ad807ec6b7873514cbq.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S9cba692a2a954c8893ea7abc3767f6cfi.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sd0fb13dff7c9440fb08fd51aaec0046ek.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S2cddd6addc054e818f9d87d22827bc46D.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Sd3e47b62ff3a43a88c76ad62d2e87310a.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S45b039ccd31749e59f49dd396719179ax.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/S5e688d9f1f9f4baf9596f502dbd5ba2aT.jpg\" slate-data-type=\"image\"/><img src=\"https://ae01.alicdn.com/kf/Se452c2cdbf8d4cacaf15ec49e3534aaeZ.jpg\" slate-data-type=\"image\"/></p>"
        },
        "has_whole_sale": false,
        "ae_item_properties": {
            "ae_item_property": [
                {
                    "attr_name_id": 2,
                    "attr_value_id": 203890160,
                    "attr_name": "Brand Name",
                    "attr_value": "POEDAGAR"
                },
                {
                    "attr_name_id": 200000050,
                    "attr_value_id": 206,
                    "attr_name": "Band Material Type",
                    "attr_value": "STAINLESS STEEL"
                },
                {
                    "attr_name_id": 905,
                    "attr_value_id": 1981769804,
                    "attr_name": "Display Type",
                    "attr_value": "Numberless"
                },
                {
                    "attr_name_id": 400000603,
                    "attr_value_id": 23399591357,
                    "attr_name": "Hign-concerned Chemical",
                    "attr_value": "None"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 200000112,
                    "attr_name": "Feature",
                    "attr_value": "Luminous"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 361688,
                    "attr_name": "Feature",
                    "attr_value": "Chronograph"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 361689,
                    "attr_name": "Feature",
                    "attr_value": "Complete Calendar"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 361699,
                    "attr_name": "Feature",
                    "attr_value": "Water Resistant"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 200001706,
                    "attr_name": "Feature",
                    "attr_value": "swim"
                },
                {
                    "attr_name_id": 217,
                    "attr_value_id": 202779806,
                    "attr_name": "Feature",
                    "attr_value": "luminous hands"
                },
                {
                    "attr_name_id": 200000052,
                    "attr_value_id": -1,
                    "attr_name": "Band Length",
                    "attr_value": "24"
                },
                {
                    "attr_name_id": 326,
                    "attr_value_id": 200004494,
                    "attr_name": "Style",
                    "attr_value": "Fashion & Casual"
                },
                {
                    "attr_name_id": 200000053,
                    "attr_value_id": 200000087,
                    "attr_name": "Clasp Type",
                    "attr_value": "Push Button Hidden Clasp"
                },
                {
                    "attr_name_id": 219,
                    "attr_value_id": 9441741844,
                    "attr_name": "Origin",
                    "attr_value": "Mainland China"
                },
                {
                    "attr_name_id": 581,
                    "attr_value_id": 1568,
                    "attr_name": "Movement",
                    "attr_value": "Quartz"
                },
                {
                    "attr_name_id": 200000057,
                    "attr_value_id": 201564810,
                    "attr_name": "Water Resistance Depth",
                    "attr_value": "3Bar"
                },
                {
                    "attr_name_id": 20280,
                    "attr_value_id": 206,
                    "attr_name": "Case Material",
                    "attr_value": "STAINLESS STEEL"
                },
                {
                    "attr_name_id": 200009205,
                    "attr_value_id": -1,
                    "attr_name": "Case Thickness",
                    "attr_value": "11"
                },
                {
                    "attr_name_id": 100005870,
                    "attr_value_id": 436,
                    "attr_name": "Boxes & Cases Material",
                    "attr_value": "Paper"
                },
                {
                    "attr_name_id": 3,
                    "attr_value_id": -1,
                    "attr_name": "Model Number",
                    "attr_value": "984-A"
                },
                {
                    "attr_name_id": 200000051,
                    "attr_value_id": 1981786433,
                    "attr_name": "Band Width",
                    "attr_value": "20 to 24 mm"
                },
                {
                    "attr_name_id": 200000046,
                    "attr_value_id": 1981786434,
                    "attr_name": "Dial Diameter",
                    "attr_value": "40 to 44 mm"
                },
                {
                    "attr_name_id": 348,
                    "attr_value_id": 351626,
                    "attr_name": "Certification",
                    "attr_value": "CE"
                },
                {
                    "attr_name_id": 200000047,
                    "attr_value_id": 353,
                    "attr_name": "Case Shape",
                    "attr_value": "Round"
                },
                {
                    "attr_name_id": 200000041,
                    "attr_value_id": 200000062,
                    "attr_name": "Dial Window Material Type",
                    "attr_value": "Hardlex"
                },
                {
                    "attr_name_id": 200000137,
                    "attr_value_id": 201564807,
                    "attr_name": "Item Type",
                    "attr_value": "Quartz Wristwatches"
                }
            ]
        },
        "ae_store_info": {
            "store_id": 1102859153,
            "shipping_speed_rating": "4.7",
            "communication_rating": "4.7",
            "store_name": "POEDAGAR Store",
            "store_country_code": "CN",
            "item_as_described_rating": "4.7"
        }
    }
  const [jsonData, setJsonData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [editValue, setEditValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleEdit = (path, value) => {
    setCurrentPath(path);
    setEditValue(typeof value === 'object' ? JSON.stringify(value) : value);
    setEditMode(true);
    setIsAdding(false);
  };

  const handleAdd = (path) => {
    setCurrentPath(path);
    setNewKey('');
    setNewValue('');
    setEditMode(true);
    setIsAdding(true);
  };

  const handleDelete = (path) => {
    const newData = { ...jsonData };
    let current = newData;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    if (Array.isArray(current)) {
      current.splice(path[path.length - 1], 1);
    } else {
      delete current[path[path.length - 1]];
    }
    
    setJsonData(newData);
  };

  const handleSave = () => {
    const newData = { ...jsonData };
    let current = newData;
    
    for (let i = 0; i < currentPath.length - 1; i++) {
      current = current[currentPath[i]];
    }
    
    if (isAdding) {
      if (Array.isArray(current)) {
        current.push(JSON.parse(newValue));
      } else {
        current[newKey] = JSON.parse(newValue);
      }
    } else {
      const lastKey = currentPath[currentPath.length - 1];
      if (Array.isArray(current[lastKey]) || typeof current[lastKey] === 'object') {
        current[lastKey] = JSON.parse(editValue);
      } else {
        current[lastKey] = editValue;
      }
    }
    
    setJsonData(newData);
    setEditMode(false);
  };

  const renderValue = (value, path) => {
    if (value === null) {
      return 'null';
    }
    
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return `[Array(${value.length})]`;
      }
      return `{Object}`;
    }
    
    return value.toString();
  };

  const renderNode = (data, path = []) => {
    if (typeof data !== 'object' || data === null) {
      return (
        <span className="inline-flex items-center">
          {renderValue(data, path)}
          <button 
            onClick={() => handleEdit(path, data)}
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          >
            Edit
          </button>
        </span>
      );
    }
    
    if (Array.isArray(data)) {
      return (
        <div className="pl-4 border-l-2 border-gray-200">
          <span className="text-gray-500">[</span>
          <button 
            onClick={() => handleAdd(path)}
            className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
          >
            Add Item
          </button>
          <ul className="pl-4">
            {data.map((item, index) => (
              <li key={index} className="my-1">
                <div className="flex items-center">
                  {renderNode(item, [...path, index])}
                  <button 
                    onClick={() => handleDelete([...path, index])}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <span className="text-gray-500">]</span>
        </div>
      );
    }
    
    return (
      <div className="pl-4 border-l-2 border-gray-200">
        <span className="text-gray-500">{'{'}</span>
        <button 
          onClick={() => handleAdd(path)}
          className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
        >
          Add Property
        </button>
        <ul className="pl-4">
          {Object.entries(data).map(([key, value]) => (
            <li key={key} className="my-1">
              <div className="flex items-center">
                <strong className="text-purple-600">{key}: </strong>
                {renderNode(value, [...path, key])}
                <button 
                  onClick={() => handleDelete([...path, key])}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <span className="text-gray-500">{'}'}</span>
      </div>
    );
  };

  return (
    <div className="p-6 container">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Editor</h2>
      
      {editMode ? (
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            {isAdding ? 'Add New Item' : 'Edit Item'}
          </h3>
          {isAdding && !Array.isArray(jsonData) && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Key:</label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Value:</label>
            <textarea
              value={isAdding ? newValue : editValue}
              onChange={(e) => isAdding ? setNewValue(e.target.value) : setEditValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-32"
              placeholder="Enter value (for objects/arrays use valid JSON)"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow mb-6 overflow-x-auto">
          {renderNode(jsonData)}
        </div>
      )}
      
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-100">Output JSON</h3>
        <pre className="bg-gray-900 p-4 rounded text-gray-100 overflow-x-auto text-sm">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default EditProduct;
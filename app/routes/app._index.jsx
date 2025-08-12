import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  MediaCard,
  VideoThumbnail,
  Modal,
  FooterHelp,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

// No actions on the welcome page
export const action = async () => null;

export default function Index() {
  const shopify = useAppBridge();
  const [videoOpen, setVideoOpen] = useState(false);
  // Replace these with your Files CDN URLs from Admin → Content → Files
  const videoUrl = "https://cdn.shopify.com/videos/c/o/v/2eee56a0ca504a76b9db46835f28a11c.mov";
  const thumbnailUrl = "https://cdn.shopify.com/s/files/1/0646/9478/0151/files/Screenshot_2025-08-12_at_2.58.47_PM.png?v=1755029114";

  // useEffect(() => {
  //   shopify?.toast?.show?.("Welcome to CSV Cart Builder 🙂");
  // }, [shopify]);

  return (
    <Page>
      <BlockStack gap="500">
      <MediaCard
      title="Welcome to Bulky Cart Builder CMAS Edition 🥋"
      primaryAction={{
        content: 'Get Started',
        onAction: () => {
          // TODO: Add a link to the Theme Editor
          window.open("shopify:admin/themes/current/editor", "_blank");
        },
      }}
      description={`Open the Theme Editor and add the "Cart Builder" App block to a template. Visit your storefront and add products to the shopping list.`}
      
    >
      <VideoThumbnail
        videoLength={80}
        thumbnailUrl={thumbnailUrl}
        onClick={() => setVideoOpen(true)}
      />
    </MediaCard>
    <Modal
      open={videoOpen}
      onClose={() => setVideoOpen(false)}
      title="Intro video"
      large
    >
      <Modal.Section>
        <video
          src={videoUrl}
          poster={thumbnailUrl}
          style={{ width: '100%', borderRadius: 8 }}
          controls
          autoPlay
        />
      </Modal.Section>
    </Modal>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">Why merchants love this 🛍️</Text>
                <BlockStack gap="300">
                  <Box>
                    <Text as="h3" variant="headingMd">Blazing‑fast ordering ⚡️</Text>
                    <Text as="p" variant="bodyMd">Search products, expand variants, and add multiples in seconds. Perfect for B2B and wholesale.</Text>
                  </Box>
                  <hr style={{border: 0, height: 1, background: 'var(--p-color-border)'}} />
                  <Box>
                    <Text as="h3" variant="headingMd">CSV in and out 📈</Text>
                    <Text as="p" variant="bodyMd">Import lists from sales reps or spreadsheets; export for records or re‑orders.</Text>
                  </Box>
                  <hr style={{border: 0, height: 1, background: 'var(--p-color-border)'}} />
                  <Box>
                    <Text as="h3" variant="headingMd">CMAS Exclusive catalogs 🔒</Text>
                    <Text as="p" variant="bodyMd">Gate products with customer tags like VIP‑PMA, VIP‑CMA, or RSB so the right buyers see the right items.</Text>
                  </Box>
                  <hr style={{border: 0, height: 1, background: 'var(--p-color-border)'}} />
                  <Box>
                    <Text as="h3" variant="headingMd">Stock‑aware adds 📦</Text>
                    <Text as="p" variant="bodyMd">Out‑of‑stock variants are disabled and flagged. We pre‑check inventory before adding to the cart and highlight any issues.</Text>
                  </Box>
                  <InlineStack gap="300" align="start">
                    <Button
                      variant="primary"
                      tone="success"
                      onClick={() => window.open("shopify:admin/themes/current/editor", "_blank")}
                    >
                      Get started
                    </Button>
                    <Button url="/app/settings" variant="secondary">
                      Settings
                    </Button>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
            <FooterHelp>
By Martial Artist, for Martial Artists.
    </FooterHelp>
          </Layout.Section>
        </Layout>
    </BlockStack>
    </Page>
  );
}

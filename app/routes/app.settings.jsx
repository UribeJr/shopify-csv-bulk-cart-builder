import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  InlineStack,
  Button,
  ChoiceList,
  InlineGrid,
  Divider,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const persisted = (globalThis.__CSV_FEATURES__ ?? { importExportEnabled: true });
  return json(persisted);
};

export const action = async ({ request }) => {
  await authenticate.admin(request);
  const form = await request.formData();
  const enabled = form.get("importExportEnabled") === "true";
  globalThis.__CSV_FEATURES__ = { importExportEnabled: enabled };
  return json({ ok: true, importExportEnabled: enabled });
};

export default function AdditionalPage() {
  const app = useAppBridge();
  const fetcher = useFetcher();
  const loaderData = useLoaderData();
  const [enabled, setEnabled] = useState(loaderData?.importExportEnabled ?? true);

  useEffect(() => {
    if (fetcher.data?.importExportEnabled !== undefined) {
      setEnabled(fetcher.data.importExportEnabled);
      app.toast?.show?.("Settings saved");
      if (typeof window !== "undefined") {
        window.__CSV_FEATURES__ = { importExportEnabled: fetcher.data.importExportEnabled };
      }
    }
  }, [fetcher.data, app]);

  useEffect(() => {
    if (typeof window !== "undefined" && loaderData) {
      window.__CSV_FEATURES__ = { importExportEnabled: loaderData.importExportEnabled };
    }
  }, [loaderData]);

  const save = () => {
    const fd = new FormData();
    fd.set("importExportEnabled", String(enabled));
    fetcher.submit(fd, { method: "post" });
  };

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        {/* Section: CSV Features */}
        {/* <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box as="section" paddingInlineStart={{ xs: 400, sm: 0 }} paddingInlineEnd={{ xs: 400, sm: 0 }}>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">CSV features</Text>
              <Text as="p" variant="bodyMd">Enable or disable CSV Import and Export on the storefront app block. Defaults to enabled.</Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <ChoiceList
                title="CSV Import/Export"
                choices={[
                  { label: "Enabled", value: "true" },
                  { label: "Disabled", value: "false" },
                ]}
                selected={[String(enabled)]}
                onChange={(values) => setEnabled(values[0] === "true")}
              />
              <InlineStack gap="300">
                <Button variant="primary" onClick={save} loading={fetcher.state !== "idle"}>Save</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Divider /> */}

        {/* Section: About */}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box as="section" paddingInlineStart={{ xs: 400, sm: 0 }} paddingInlineEnd={{ xs: 400, sm: 0 }}>
            <BlockStack gap="200">
              <Text as="h3" variant="headingMd">About this app</Text>
              <Text as="p" variant="bodyMd">CSV Cart Builder speeds up wholesale and B2B ordering by letting customers build large carts from search or CSV with stock-aware controls.</Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">Settings are saved instantly for your shop. Come back anytime to adjust.</Text>
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.progressus.app",
  appName: "Progressus",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;

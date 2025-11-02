import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../util/API";
import { toast } from "react-toastify";
import {
  Link,
  Package,
  RefreshCw,
  Settings,
  Clock,
  ExternalLink,
  Save,
  EyeOff,
  Eye,
} from "lucide-react";





export default function AliExpressApiSys() {
  const [tokenInfo, setTokenInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [appSecret, setAppSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const refreshToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://ali.cherrfy.com/gettoken.php");
      setTokenInfo(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getAppSecret = async () => {
    try {
      const appsecret = await API.get("/settings/key/ali_express_app_secret");
      setAppSecret(appsecret.data.value);
      console.log(appsecret.data);
    } catch (error) {
      console.error(error);
    }
  } 

  const saveAppSecret = async () => {
    try {
      const appsecret = await API.put("/settings", {
        key: "ali_express_app_secret",
        value: appSecret
      });
      console.log(appsecret);
      toast.success("App Secret saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save App Secret");
    } finally {
      setLoading(false);
    }
  }
const getAccessToken = async () => {
  try {
    const accesstoken = await API.get("/settings/key/ali_express_access_token_sg");
    setAccessToken(accesstoken.data.value);
    console.log(accesstoken.data);
  } catch (error) {
    console.error(error);
  }
}
  const saveAccessToken = async () => {
    try {
      const accessTokenResponse = await API.put("/settings", {
        key: "ali_express_access_token_sg",
        value: accessToken
      });
      console.log(accessTokenResponse.data);
      toast.success("Access Token saved successfully");
      setAccessToken(accessTokenResponse.data.value); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to save Access Token: " + error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAccessToken();
    getAppSecret();
    refreshToken();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">AliExpress Integration</h1>
                    <p className="text-gray-600">Connect and manage your AliExpress integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Last sync: 2024-05-07 10:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://ali.cherrfy.com/" target="_blank" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh Token</span>
                </a>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>API Docs</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto my-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-gray-200 rounded-xl shadow-sm p-5">
  {/* 🔐 App Secret */}
  <div className="flex flex-col flex-1 w-full space-y-2">
    <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
      App Secret <span className="text-xs text-gray-500">(From ALI)</span>
    </label>
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={appSecret}
        onChange={(e) => setAppSecret(e.target.value)}
        placeholder="Enter App Secret..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400"
      />
      <button
        onClick={saveAppSecret}
        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
      >
        <Save className="w-4 h-4" />
        <span className="text-sm font-medium">Save</span>
      </button>
    </div>
  </div>

  {/* 🔑 Access Token */}
  <div className="flex flex-col flex-1 w-full space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
        Access Token <span className="text-xs text-gray-500">(From ALI)</span>
      </label>
      <span
        className={`text-xs font-semibold ${
          accessToken === tokenInfo?.access_token
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {accessToken === tokenInfo?.access_token ? "Connected ✅" : "Not Connected ❌"}
      </span>
    </div>
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        placeholder="Enter Access Token..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400"
      />
      <button
        onClick={saveAccessToken}
        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
      >
        <Save className="w-4 h-4" />
        <span className="text-sm font-medium">Save</span>
      </button>
    </div>
  </div>
</div>

        {loading ? (
          <div class="flex justify-center items-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <section class="rounded-lg border bg-white p-5 shadow-sm">
            <h3 class="font-medium mb-4">Current token status</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <tbody class="divide-y">
                  <tr><td class="py-2 pr-6 text-gray-500">access_token</td>
                    <td class="py-2">
                      <span id="val-at" data-full={tokenInfo?.access_token} data-masked={tokenInfo?.access_token?.slice(0, 10) + '...' + tokenInfo?.access_token?.slice(-10)} data-showing="masked" class="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{tokenInfo?.access_token}</span>
                      <button data-copy-for="val-at" class="ml-2 text-blue-600 hover:underline">Copy</button>
                      <button class="ml-2 text-gray-600 hover:underline">Show/Hide</button>
                    </td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">refresh_token</td>
                    <td class="py-2">
                      <span id="val-rt" data-full={tokenInfo?.refresh_token} data-masked={tokenInfo?.refresh_token?.slice(0, 10) + '...' + tokenInfo?.refresh_token?.slice(-10)} data-showing="masked" class="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{tokenInfo?.refresh_token?.slice(0, 10) + '...' + tokenInfo?.refresh_token?.slice(-10)}</span>
                      <button data-copy-for="val-rt" class="ml-2 text-blue-600 hover:underline">Copy</button>
                      <button class="ml-2 text-gray-600 hover:underline">Show/Hide</button>
                    </td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">expires_in</td><td class="py-2">{tokenInfo?.expires_in}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">expire_time</td><td class="py-2">{tokenInfo?.expire_time}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">refresh_expires_in</td><td class="py-2">{tokenInfo?.refresh_expires_in}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">refresh_token_valid_time</td><td class="py-2">{tokenInfo?.refresh_token_valid_time}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">account_id</td><td class="py-2">{tokenInfo?.account_id}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">user_id</td><td class="py-2">{tokenInfo?.user_id}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">seller_id</td><td class="py-2">{tokenInfo?.seller_id}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">sp</td><td class="py-2">{tokenInfo?.sp}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">locale</td><td class="py-2">{tokenInfo?.locale}</td></tr>
                  <tr><td class="py-2 pr-6 text-gray-500">account</td><td class="py-2">{tokenInfo?.account}</td></tr>
                </tbody>
              </table>
            </div>
            <p class="text-xs text-gray-500 mt-3">File: <code class="bg-gray-100 px-1 rounded">token/token.json</code></p>
          </section>
        )}



    
      </div>
    </div>
  );
}

import axios from "axios";

// if used with typescript
// interface FetchParams {
//   url: string
//     params: any
//     headers: any
//     method: string
//   }

// helper to use object as querystring params
function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => key + "=" + obj[key])
    .join("&");
}

function generateErrorResponse(message, data) {
  return {
    status: "error",
    message,
    data,
  };
}

export class Fetcher {
  constructor(headers, /*private*/ baseURL /*?*/) {
    this.headers = headers ?? {
      "Content-Type": "application/json",
    };
    this.baseURL = baseURL;
  }

  // innermost method to fetch data from from url
  static _fetch = async ({ url, params, headers, method }) => {
    const options = {
      method,
      headers,
    };
    if (params) {
      if (method === "GET") {
        url += "?" + objectToQueryString(params);
      } else {
        options.body = JSON.stringify(params);
      }
    }

    const response = await fetch(url, options);

    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    if (![200, 201].includes(response.status)) {
      throw generateErrorResponse(
        `The server responded with an unexpected status ${response.status}.`,
        JSON.stringify(data)
      );
    }

    return data;
  };

  fetch(url, params, method = "GET") {
    if (this.baseURL) url = this.baseURL + url;
    return Fetcher._fetch({ url, params, headers: this.headers, method });
  }

  get(url, params) {
    return this.fetch(url, params);
  }

  post(url, params) {
    return this.fetch(url, params, "POST");
  }

  update(url, params) {
    return this.fetch(url, params, "PUT");
  }

  remove(url, params) {
    return this.fetch(url, params, "DELETE");
  }
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
// TODO add token & user info to headers
export const backendFetcher = new Fetcher(null, `${baseUrl}/api/v1`);

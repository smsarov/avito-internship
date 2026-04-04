import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
});

const signalControllerMap = new Map<AbortSignal, AbortController>();

http.interceptors.request.use((config) => {
  const controller = new AbortController();

  signalControllerMap.set(controller.signal, controller);
  config.signal = controller.signal;

  return config;
});

http.interceptors.response.use(
  (response) => {
    const signal = response.config.signal;

    if (signal instanceof AbortSignal) {
      signalControllerMap.delete(signal);
    }

    return response;
  },
  (error) => {
    const signal = error.config?.signal;

    if (signal instanceof AbortSignal) {
      signalControllerMap.delete(signal);
    }

    return Promise.reject(error);
  }
);

export function cancelAllRequests() {
  signalControllerMap.forEach((controller) => controller.abort());
  signalControllerMap.clear();
}
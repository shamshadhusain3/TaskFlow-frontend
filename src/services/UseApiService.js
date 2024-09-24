import { useState } from "react";
import axios from "axios";

const useApiService = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (method, url, payload = null) => {
    setLoading(true);
    try {
      const response = await axios({ method, url, data: payload });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Generic GET request
  const get = async (endpoint) => {
    await makeRequest("get", endpoint);
  };

  // Generic GET request by ID
  const getById = async (endpoint, id) => {
    if (id) {
      await makeRequest("get", `${endpoint}/${id}`);
    }
  };

  // Generic POST request
  const create = async (endpoint, payload) => {
    await makeRequest("post", endpoint, payload);
  };

  // Generic PUT request
  const update = async (endpoint, id, payload) => {
    if (id) {
      await makeRequest("put", `${endpoint}/${id}`, payload);
    }
  };

  // Generic DELETE request
  const remove = async (endpoint, id) => {
    if (id) {
      await makeRequest("delete", `${endpoint}/${id}`);
    }
  };

  return {
    data,
    loading,
    error,
    get,
    getById,
    create,
    update,
    remove,
  };
};

export default useApiService;

import api from "../../../../utils/api";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { path, data } = req.body;
      const response = await api.post(`/auth/${path}`, data);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "An error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

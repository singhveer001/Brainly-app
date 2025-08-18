import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

export function SharePage() {
  const { shareLink } = useParams();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setUsername(response.data.username);
        setContents(response.data.content);
      } catch (err: any) {
        setError("Invalid or expired link.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        Shared Brain of {username.split('@')[0]}
      </h1>
      {contents.length > 0 ? (
        <div className="flex gap-4 flex-wrap justify-center">
          {contents.map(({ _id, type, link, title }) => (
            <Card key={_id} type={type} link={link} title={title} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No content shared yet.</p>
      )}
    </div>
  );
}

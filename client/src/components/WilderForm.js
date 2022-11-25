import axios from "axios";
import { useState } from "react";

export default function WilderForm({ onWilderCreated }) {
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const createWilder = async () => {
    try {
      setProcessing(true);
      const { data } = await axios.post("http://localhost:4000/wilders", {
        name,
      });
      setName("");
      onWilderCreated(data);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      className="pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        createWilder();
      }}
    >
      <label htmlFor="name" className="mr-2">
        <span className="mr-3">Name</span>
        <input
          required
          disabled={processing}
          type="text"
          maxLength={30}
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit" disabled={processing}>
        +
      </button>
      <br />
      <br />
    </form>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Infomar.css";

interface InfoMarketing {
  id?: number;
  nombre: string;
  apellidos: string;
  celular: string;
  email: string;
  nivelEducativo: string;
}

const InfoMarketing: React.FC = () => {
  const [infoMarketings, setInfoMarketings] = useState<InfoMarketing[]>([]);
  const [formData, setFormData] = useState<InfoMarketing>({
    nombre: "",
    apellidos: "",
    celular: "",
    email: "",
    nivelEducativo: "Primaria",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = "http://localhost:8000/info-marketing";

  // Fetch all records
  const fetchInfoMarketing = async () => {
    try {
      const response = await axios.get<InfoMarketing[]>(API_URL);
      setInfoMarketings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add or Update record
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Create
        await axios.post(API_URL, formData);
      }
      setFormData({ nombre: "", apellidos: "", celular: "", email: "", nivelEducativo: "Primaria" });
      fetchInfoMarketing();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Delete record
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchInfoMarketing();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Fill form for editing
  const handleEdit = (infoMarketing: InfoMarketing) => {
    setFormData(infoMarketing);
    setEditingId(infoMarketing.id!);
  };

  // Logic for sending WhatsApp message
  const sendWhatsAppMessage = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, ""); // Eliminar caracteres no numéricos
    const message = `Hola, ${formattedPhone}! Estamos en contacto.`;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank"); // Abrir WhatsApp Web en una nueva pestaña
  };

  useEffect(() => {
    fetchInfoMarketing();
  }, []);

  return (
    <div>
      <h1>Gestión de InfoMarketing</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Celular"
          value={formData.celular}
          onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.nivelEducativo}
          onChange={(e) => setFormData({ ...formData, nivelEducativo: e.target.value })}
        >
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Universidad">Universidad</option>
        </select>
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      {/* Tabla de registros */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Nivel Educativo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {infoMarketings.map((info) => (
            <tr key={info.id}>
              <td>{info.nombre}</td>
              <td>{info.apellidos}</td>
              <td>{info.celular}</td>
              <td>{info.email}</td>
              <td>{info.nivelEducativo}</td>
              <td>
                <button onClick={() => handleEdit(info)}>Editar</button>
                <button onClick={() => handleDelete(info.id!)}>Eliminar</button>
                <button onClick={() => sendWhatsAppMessage(info.celular)}>Enviar WhatsApp</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoMarketing;

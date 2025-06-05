"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type User = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const updateRole = async (id: string, role: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        await fetchUsers();
      } else {
        alert("Error al actualizar el rol");
      }
    } catch (err) {
      console.error("Error actualizando el rol:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center border rounded p-4 shadow-sm"
        >
          <div>
            <p className="font-medium">{user.name || "Sin nombre"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={user.role}
              onValueChange={(value) => updateRole(user.id, value)}
              disabled={loading}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
              disabled={loading}
            >
              Alternar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

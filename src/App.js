// app/page.jsx
"use client";

import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";

export default function App() {
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const initOneSignal = async () => {
      if (typeof window !== "undefined") {
        await OneSignal.init({
          appId: "41313dbe-b7dd-4b85-9fb5-537230da4ba1",
          safari_web_id:
            "web.onesignal.auto.5bb9a1c9-03c0-4629-b099-1bc8c9257be5",

          notifyButton: { enable: false },
          allowLocalhostAsSecureOrigin: true,
        });

        // Lấy playerId sau khi init
        const id = await OneSignal.User.onesignalId;
        if (id) setPlayerId(id);
      }
    };

    initOneSignal();
  }, []);

  const registerForNotifications = async () => {
    try {
      // Hiển thị prompt đăng ký
      const granted = await OneSignal.Notifications.requestPermission();
      if (granted) {
        const id = await OneSignal.User.onesignalId;
        if (id) setPlayerId(id);
      } else {
        console.warn("User denied notification permission");
      }
      // Lấy lại Player ID
    } catch (err) {
      console.error("Lỗi hiển thị prompt:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Đăng ký nhận thông báo</h1>
      <button
        onClick={registerForNotifications}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4"
      >
        Nhận thông báo
      </button>
      {playerId && (
        <p className="text-gray-700">
          Bạn đã đăng ký! <br />
          <span className="font-mono">{playerId}</span>
        </p>
      )}
    </div>
  );
}

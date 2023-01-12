'use client';
import React, {useEffect, useState} from "react";
import styles from "./ProfilePage.module.css"
import {useRouter} from "next/navigation";
import {useCookies} from "react-cookie";

export default function ProfilePage() {
    const [avatar, setAvatar] = useState<string | null>();
    const [id, setID] = useState<string | null>();
    const [username, setUsername] = useState<string | null>();
    const router = useRouter();
    const [cookie] = useCookies<string>();
    useEffect(() => {
        const cookieToken = cookie["access_token"];
        if (!cookieToken) {
            router.push("/");
        }
        const info = JSON.parse(sessionStorage.getItem("info") ?? "{}");
        if (info) {
            setAvatar(info.avatar);
            setID(info.id);
            setUsername(info.username);
        }
    })
    return (<section className="section">
        <div className={"info"}>
            <div className={`text card`}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <div>Discord Profile</div>
                    <div className={styles.headings}>id:
                        <div className={styles.values}>{id}</div>
                    </div>
                    <div className={styles.headings}>username:
                        <div className={styles.values}>{username}</div>
                    </div>
                </div>
                <img style={{
                    borderRadius: "20%"
                }}
                     src={avatar && `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` || "https://cdn.discordapp.com/embed/avatars/0.png"}
                     width={100} height={100} alt={"alt"}/>
            </div>
            <div className={`text card`}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <div>Stats</div>
                    <div className={styles.headings}>XP:</div>
                    <div className={styles.headings}>Level:</div>
                </div>
            </div>
            <div className={`text card`}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <div>User Infos</div>
                    <div className={styles.headings}>Brawl Stars:</div>
                    <div className={styles.headings}>Clash Royale:</div>
                    <div className={styles.headings}>Minecraft:</div>
                    <div className={styles.headings}>Twitch:</div>
                </div>
            </div>
        </div>
    </section>)
}

// noinspection JSUnresolvedLibraryURL

'use client';

import React, {useEffect, useState} from "react";
import logo from "../public/logo.png";
import "./globals.css";
import {useCookies} from "react-cookie";
import { clientId as _clientId, redirect as _redirect } from "../config";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [ dark, setDark ] = useState(false);
    const [ close, setClose ] = useState(true);
    const [ cookie, _, removeCookie ] = useCookies<string>()
    const [ token, setToken ] = useState<string | null>();
    const [ avatar, setAvatar ] = useState<string | null>();
    const [ id, setId ] = useState<string | null>();
    const [ clientId, setClientId ] = useState<string>();
    const [ redirect, setRedirect ] = useState<string>();
    const router = useRouter();
    useEffect(() => {
        setClientId(process.env.CLIENT_ID ?? _clientId);
        setRedirect(process.env.REDIRECT ?? _redirect);
        const cookieToken = cookie["access_token"];
        setToken(cookieToken);
        setDark(localStorage.getItem("mode") === "true")

        if (cookieToken) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookieToken}`);

            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch("https://discordapp.com/api/v6/users/@me", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setId(result.id)
                    setAvatar(result.avatar)
                    sessionStorage.setItem("info", JSON.stringify({
                        avatar: result.avatar,
                        id: result.id,
                        username: `${result.username}#${result.discriminator}`
                    }))
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }, [cookie, id, avatar])
    return (
        <html>
            <head>
                <title>Dashboard Sidebar Menu</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <meta charSet="UTF-8"/>
                <link rel="icon" href="/favicon.ico"/>
                <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
            </head>
            <body className={ dark && "dark" || "" }>
                <nav className={`sidebar ${ close && "close" || "" }`}>
                    <header>
                        <div className="image-text">
                            <span className="image">
                                { token && <img style={{
                                    padding: 5,
                                    borderRadius: "100%"
                                }
                                    } src={ avatar && `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` || "loading.gif" } alt={ "" } className='icon'></img>
                                    || <img src={ logo.src } alt="Logo"/>
                                }
                            </span>
                            <div className="text logo-text">
                                <span className="name">Stars United</span>
                                <span className="profession">Gaming Server</span>
                            </div>
                        </div>

                        <i className='bx bx-chevron-right toggle' onClick={ () => { setClose(!close) } }></i>
                    </header>

                    <div className="menu-bar">
                        <div className="menu">

                            <li className="search-box" onClick={ () => { setClose(false) } }>
                                <i className='bx bx-search icon'></i>
                                <input className="search-text-box" type="text" placeholder="Search..."/>
                            </li>

                            <ul className="menu-links">
                                <li className="nav-link">
                                    <Link href={ "/" } legacyBehavior>
                                        <a>
                                            <i className='bx bx-home-alt icon'></i>
                                            <span className="text nav-text">Home</span>
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-link">
                                    <Link href={ "/clan" } legacyBehavior>
                                        <a>
                                            <i className='bx bx-bar-chart-alt-2 icon'></i>
                                            <span className="text nav-text">Clans</span>
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-bell icon'></i>
                                        <span className="text nav-text">Discord</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <Link href={ "/analytics" } legacyBehavior>
                                        <a>
                                            <i className='bx bx-pie-chart-alt icon'></i>
                                            <span className="text nav-text">Analytics</span>
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-heart icon'></i>
                                        <span className="text nav-text">Likes</span>
                                    </a>
                                </li>

                                { token && <li className="nav-link">
                                    <Link href={ "/profile" } legacyBehavior>
                                        <a>
                                            <i className='bx bx-user icon'></i>
                                            { !close && <span className="text nav-text">Profile</span> }
                                        </a>
                                    </Link>
                                </li> }
                            </ul>
                        </div>

                        <div className="bottom-content">
                            <li className="">
                                { token && <a onClick={ () => {
                                    removeCookie("access_token", { path: "/" });
                                    sessionStorage.removeItem("info");
                                    router.refresh();
                                } }>
                                    <i className={`bx bx-log-out icon`}></i>
                                    <span className="text nav-text">
                                        Logout
                                    </span>
                                </a> || <a href={ `https://discord.com/api/oauth2/authorize?client_id=${ clientId }&redirect_uri=${ encodeURIComponent(redirect!) }&response_type=code&scope=identify%20guilds%20email` }>
                                    <i className={`bx bx-log-in icon`}></i>
                                    <span className="text nav-text">
                                        Login
                                    </span>
                                </a> }
                            </li>

                            <li className="mode">
                                <div className="sun-moon">
                                    <i className='bx bx-moon icon moon'></i>
                                    <i className='bx bx-sun icon sun'></i>
                                </div>
                                <span className="mode-text text">Dark mode</span>

                                <div className="toggle-switch" onClick={ () => {
                                    window.localStorage.setItem("mode", `${!dark}`)
                                    setDark(!dark);
                                } }>
                                    <span className="switch"></span>
                                </div>
                            </li>

                        </div>
                    </div>
                </nav>
                { children }
            </body>
        </html>
    )
}

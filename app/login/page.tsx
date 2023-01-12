'use client';

import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import { clientId as _clientId, clientSecret as _clientSecret, redirect as _redirect } from "../../config"
import { useCookies } from "react-cookie";

export default () => {
    const router = useRouter();
    const params = useSearchParams();
    const [ _, setCookie, removeCookie ] = useCookies<string>();

    useEffect(() => {
        const code = params.get("code");
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", code ?? "null");
        urlencoded.append("client_id", process.env["CLIENT_ID"] ?? _clientId);
        urlencoded.append("client_secret", process.env["CLIENT_SECRET"] ?? _clientSecret);
        urlencoded.append("redirect_uri", process.env["REDIRECT"] ?? _redirect);

        let requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://discord.com/api/oauth2/token", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCookie("access_token", result.access_token, {
                    // expires: date,
                    path: '/',
                    maxAge: Math.floor(Date.now() / 1000) + result.expires_in
                });
                router.push("/");
            })
            .catch(error => {
                console.log('error', error);
                removeCookie("access_token")
                router.push("/");
            });
    }, [])
    return (<section className="section">
        <div className="text">Logging in...</div>
    </section>)
}

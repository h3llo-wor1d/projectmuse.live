import fetch from "node-fetch";

async function test() {
  let f3 = await fetch("https://discord.com/api/v9/invites/MqbhfNa2?inputValue=SERVER_JOIN_STR&with_counts=true&with_expiration=true", {
        headers: {
            "Authorization": `Bearer RrlJlYgzqgtDuNNZqX6rgR2zYNfXQD`
        }
    })
  let f4 = await f3.json();
  console.log(f4)
}

test()

async function test2() {
  fetch("https://discord.com/api/v9/invites/MqbhfNa2", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US",
    "authorization": "OTAyMjQyOTI2NTc3NDU1MjM1.GN0w7m.FTCc1Hm5BtxBN4UrhjkMXHcuBq2PyDKi9BnPNo",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-captcha-key": "P1_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.hKdwYXNza2V5xQbnlbwG3Xu6zbj_cKj1R4vt-ZO9qf3zYcSbq-PmxPP9q5DOBJrU708OnCGrtW0wJE1vQvLZ_bwax-cBW3ewAs-2UYo6zHuc7KA2pFldo7Y4oLEWNIZImtBX8wzU5ZWGQ6Pqswnz10KlbOZe5cl337U-ADuVhCX0oKAvkSXtmhFiLTxRI1M70Gd7pVySJ9KV_z-Aq-JDdXzSmTdxKi-ybB0gppvVaaUkD1WNZtpGOK7JsLXvGK1DGl-qQSy0SPCYT6qsPgL1LcnJfNW4_MChSm2IA9QJ6_FjTXBTbUHqBdGGgKeahd3sgltYmLTypDYKeQPG05U_j6FRz-szaBpPzesD5rr45-HMFUXfro3AlXQPGZAfBBV1cWtL6O2LzLFs0U-zUDho6OsCd807h33hq_EANe9KYQ2dM7EELzd07DbrcaXgd7Zr8Ei_CbeZazbQ25L51B6VSaxLV-sF6w4nqdSWliwrQHuvPNhuj6mExXP47xMav2cVWmx0yTjtLj32-bX36sm4Tk1AKZL-KSTc8SZcYvDECo4RbUpAFxhPgHDmw6bIWn_VRzPOXHObVtaaMP7rJhg3Hr7dkxy5pozsMOyZ3GHZTVt_m2XCkw1biXndulEeqGvrD0cPBL1A5lSqX4ynX3jy7o9zhUPomwYbcw7u-RD5bUKNTYgXhWtqQST592DuRz-Bx2eKnsiLejAB3upUieD38XbQMdF-RRRXwMVAmllM5e7H-XzPmJgLTwIz9CyR7pSsJH1QROd7hCOjwlqZqEUaSfOHzrQf77wO1HgeQK8Kd9wzGZS65H8x0VmnG9PB0cgmph9XAxxwu33h4w4qdoLI1FLR7295GJNrkVnlvASJyXdinI8nZWGxmBU50sZzDCMRNmj7Ro9vs3h6U_8jcQt7fznlE-25St1ZYNmD2Z6rSRa1MEDJLeP3L-2AdyMEiP-Aw0EfuWLwdrlZVbrBWN6emc0TWQ8oJfPgkwFuv8pU49J9PKgy2tUt8LyXq4F4F9R5HUX6GBLIJSl7D0JcWGSsg8e1EF9w0y8avrIs32QDxnNDzvLDsYZ0_F5cLhlahS6JF2P5D00WMlhbF4JluquuF4E2HBxIAueuCK9TM-_z_0IEQzRYjIX5Ob7ts40L5LQy9x8amPqW8iNGKtb_hcFM4i8vM9T8kFKHipC-xfDCe0Y_Hc7p2xfpda_ylKoCElfcBCnPzZQm2Fdgnxs0A1fLdROTAS0DigIU9uNIriq5i7WU2JnxlP2GW0ECZd0BvIuGL8d0cC_Snb3wC4jGrKDFf2PsFOnHojEOoFjhcIdtsTgRGB0lTmXfP_qZpM4TBiejqi05sMYJxuRk2FmiuboQBBmPfKOZj-BJIOvVyYEFG_5wNaKPG-AHVIGDeeBmIqp1xXDVQfCou0Bc3KloKTEevH6Wgi4R-0a6Dzv18MBJZ9Yu4QG3pebloL7fKB8NVlP4sw5ENkGjuoYIZaidZGIeP03oRF10eKtC4M9vaYjcreZjEgPmz3z3SdrCj1ERKvLdvqGMD4e22T8f03UG-NWj1nvK5ukQibL_veY7PLv00gCJBDQRhV03bU6QIjJEzWeWYnGxxWLRh83BWtlSPjqE-KW7xvp6v1EUr-Ya8WZXJ86uKTHII99yAum9P5drpmzW3TWlHBtJfF5l2zM2MFSTSo0sSc_mIKztMFNZNAG-_gc3Hp1ft4KOqBArHK5FT5484K2lkB2AfLKP0acdmQkYG1oFmAqBYP_KZauCnBmt5O0_9nGDnR_toXam11y6K02NrXAlcdW03QW8WPxp2-u05_6wCwsopgdZcpH7n5pteeVy0TPBC-mu_T82xHwlgd09-4lthLkiiOX_s7xMiwpknc9tXaXrPYwTKlbWvMUpb7N0TNq2WC6AfgzxV-pmyZXE7I6GNStaKEhDzONtX1QBjaY3StQRdRJEAU3USlgh39GoS-un3G3FR2JGLyhXmRE3QQsKOj5MT2ACo8F_8VMNMmcXt1NFFskVJBu_aACHzY3Sf_VXtb2-OXMR3zaGKJo8hLFPScMxKh5gW1shDO0jsWwhK8FSbhy71f6NtGMIjOSx2wzzfKAznebgxxXroa5ymrEW6aDx8v04q_oxgzhVxtMWBxkuJ6BuHoKR0oQWG-0L0naTUL4c95OwMUMuUQsC504LGlu95gaGj3NtMwJIPiuPoYT4PRcGFuNM8Yhzfm69An7fgpe-nfG3yRrscv9xb4tcK09HgWyBNyhnCR2sGSB9BIbpJL8Kv5YnJ2IsH7T9Usf1JPXUt4-Ndq6QQaov-nU9sfTw05XB_owctRFUAuwsEK8PK23PqdO2FuwR7D2lpIByqDOS7NIbVvb807AC-mjDo2V4cM5l8PMQqHNoYXJkX2lkzjGtTIGicGQA.LX9ULgqwxjGI1xavFpP-ltsRH05ozfX4G6QA4s5Fdb0",
    "x-captcha-rqtoken": "IllVdElhbm9qVUtZalQrZWxPdnpVZ3ZyVURQYk5icWVsaTVVQU5FZFdHVC9XRTkxRm1ISzdCNTNrakRZVkYwYzlrdU9PYkE9PXZhcVYxZkY4UXRPT3YzaEwi.ZfDyjw.U2sBK7GdN8HWYCIzglqju-eOxcs",
    "x-context-properties": "eyJsb2NhdGlvbiI6Ikludml0ZSBCdXR0b24gRW1iZWQiLCJsb2NhdGlvbl9ndWlsZF9pZCI6bnVsbCwibG9jYXRpb25fY2hhbm5lbF9pZCI6IjExMDAxMjA2OTM5Njc5NTM5NTEiLCJsb2NhdGlvbl9jaGFubmVsX3R5cGUiOjEsImxvY2F0aW9uX21lc3NhZ2VfaWQiOiIxMjE3MjY1NDUyMjQ2NjM0NTI2In0=",
    "x-debug-options": "bugReporterEnabled",
    "x-discord-locale": "en-US",
    "x-discord-timezone": "America/New_York",
    "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDM1Iiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDUiLCJvc19hcmNoIjoieDY0IiwiYXBwX2FyY2giOiJpYTMyIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIGRpc2NvcmQvMS4wLjkwMzUgQ2hyb21lLzEwOC4wLjUzNTkuMjE1IEVsZWN0cm9uLzIyLjMuMjYgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjIyLjMuMjYiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoyNzQzODgsIm5hdGl2ZV9idWlsZF9udW1iZXIiOjQ0NzgwLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    "cookie": "__Secure-recent_mfa=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTAyODkyNzQsIm5iZiI6MTcxMDI4OTI3NCwiZXhwIjoxNzEwMjg5NTc0LCJpc3MiOiJ1cm46ZGlzY29yZC1hcGkiLCJhdWQiOiJ1cm46ZGlzY29yZC1tZmEtcmVwcm9tcHQiLCJ1c2VyIjo5MDIyNDI5MjY1Nzc0NTUyMzV9.Zp4ZwzF2A6Yfv5GJIbe0nQmPr5IYHI3_-vAtd7NWsFSHUzInMqCvFmFr7QofFfy580PUBR5SDa8CCB2UN6fhPA; __dcfduid=08ff89f06aab11eda2bb0de5867babb0; __sdcfduid=08ff89f16aab11eda2bb0de5867babb031db5dfc94ab52847fa6affbdb23e2475e0e39562c8e17bfb690b9237d19cdd3; __stripe_mid=ad7271c5-203c-4582-9992-7f59224fc6e7a72b64; cf_clearance=IUKd01vaqgafGugdrMB92e19dqfHlBoV3AGB2jWAI4Q-1710289169-1.0.1.1-hDbw3TAM75.GwvE3gjA07D._bKuky7t250kVLDEjoRKZYrAI2geTW.Ka59BiSuaS5BFqBKlzPHQqk9rAcpxnZQ; __cfruid=37e8422037830bd209cfc13b7d180737c4ca1d94-1710289548; _cfuvid=IX295n_ps3rQ1aNs3xoZcMtWts0BcjWZygb0.aoZlsU-1710289548585-0.0.1.1-604800000",
    "Referer": "https://discord.com/channels/@me/1100120693967953951",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"session_id\":\"b33811debb5a467ba5de81d01b75d908\"}",
  "method": "POST"
});
}

test2()
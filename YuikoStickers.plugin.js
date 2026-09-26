/**
 * @name YuikoStickers
 * @author ChatGPT
 * @description Snow Family Yuiko 이모지를 그룹별로 선택해 Discord에 입력합니다.
 * @version 2.18.3
 * @source https://github.com/awizc/YuikoStickers-plugin
 * @updateUrl https://raw.githubusercontent.com/awizc/YuikoStickers-plugin/main/YuikoStickers.plugin.js
 */

module.exports = class YuikoStickers {
    constructor() {
        this.pluginName = "YuikoStickers";
        // 입력창 버튼과 "전체" 그룹 탭에 쓰는 아이콘 (64x64 원형 PNG, 원 바깥은 투명, base64 내장)
        this.iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAhPklEQVR42sWbaYxe13nff2e59777Pgs5nBnuIimK2mV5jVk7cZzIiePYcpHUbpJWRhYlcWA4DZoGFLugKYLCgREEjdPYiZ0WNZUYauPEdmyVkhfZkkWJokYSORxus6/vvtz1nH6Ykawopi2KanvmwwwGeO97n//zf5bzLILX6VhrBaCEEPFL/zt5UneP7DlAIm+MwujWOA5vU9opx3G0XypdiJPEAigphEnitqPc6TCOGp7rPeW4ztMk5rnc6PjZf/BMazWQCCHs6/He4nUSXAohEoATJ06od73tzrui2LzXIt6Ntfs9z/O0ViRxgrGWMAwxxiCEAGuxgJISx3GQUqCVQxzH+GEQCCmnpeVLSjsPFb7+2BPi3nuTre9VgLleIK4LgJMnT+qjR4/GAMsXLow4GfVhE5sPua6+KeWl8AOfIAgxxhjAfu/7hFBSCH8wwNEeYBACq7W2xlhAWmMTIZWUXsrjxWeFYfSsUPJzUT/57OiePSuvfIf/ZwBYayVghRB2aWZmOJV1ftUa+8u5XHakPxjQHwysQCRgpdg6r/g8Ukg67QZh7JNxcgghcV0XDCRAOpsmikNrwYIwFqvSqZTIpNN0u70VIcV/8XvRH2/bu3d1i4VCCGGuVRb5WrQuhDBCCLs6e+GX3LR8OpvJHDM2Gdmo1+PBYGA2pUYLIeTLQbbWYrEoR5HOp3EcwcqVb7M0e4XZi9O06ovMLi5iooiF2VmiOBZCCCkEWgohBoOB2ajXY2OTkWwmc8xNy6dXZy/8khDCCiHMyZMn9f9VBtiTJ7U4ejS+8Pzp/eVS6ZPZTOZd3W6XMIriLQf4fZ8nhMBai3Y0UkoaC8ssPneBSzMX2LcrpLitRMYN6A0U7XAXl06fY+dtN3Hg7tsIBwFCipcA3PptgcR1HJ3L5ej1+19pNJu/sefQLdMvvuPrCsDLKbZ05fy9Kc/9Y891q61W+wcK/r3Pg+s5NJeWee7vv8PFJ56l1RxgheRNP7aHydsFXe2ScxQXv77CymKaez7+y8QMUEjMyxj0iveyQFIsFnQQhht+EP7qtsl9J15uotdtAi8XfuXy+U/ks5nPJ3FSbTZbiRBC/zDhsRbHc6lfnuXpz/wVF7/+BLmUw5Fb9jE5WWKw0WRjQfH42SadQZY4UehUloEJkFIizNVl2HIvutlsJUmcVPPZzOdXLp//xJYvEFvv/toBeFmIMytXZj5Vq1U/2ul0kzAMrZRSvQrwUK5LsLbC8w/+HX6zz/jeYSb21sjkI0bHsgiZJZ+23JwyJMsN/I5h4ZlzPPrfHkJKTahehSOTUoVhaDudblKrVT+6cmXmU1sgyB8Ggn4Vmk9Wrsx8qlIu3be6th4BjpSvzncKITFhwNTffw2/18BmFdmii5sG7XrEJqLouSxebBD1De21VRorbYoZl8snT3FmaJg7f+rtdPwB6ofgLaUU1lq1urYe1aqV+1auzCCE+Ii1VlpruZo5yKsK/8gjalPz05+qlEv3rW9sxELg/DDGv3TMpvZXZqYZzK+iUjmyeZdMPo2TcnE8jZdxERIK6RKOyhH5IKVDvpSnmi1x9quP0VxfRTvOP7L/qzlbIXDWNzbiSrl038qV6U0mPPKIuhoTrqZKJY4ejRcvvPCJWq123/rGRiSEuKYQYwUIa1h7YRrP0UjrUhkqITRoRyG1Qiu1mfk5kkolRbHsYLFE0YBixUVEXWafeRbjvToAXgaEXt/YiGq12n2LF174xFZUUK8KAGutEkLEc9NT7y+Wih9dX9+IfpCpXM3xSaXwO20GC2uUcnn6vR6pbAqlJOl0CseVuJ5DKu2iHQXCUqsVyGUz+H6fyd1VvLTL7JPTJM0uyGvO2fT6+kZULBU/Ojc99X4hRLyVPl8dAGutlFImK1em92Rz2U/5fmCSJPnhnv6V8gNSKQardYwfYG1AYgKUUlhj6XcTrEmI45goDBh0AmxskcKSz2scxyUIuoyMVVk+v8ja9DyOq7HWXAsLRJIk2vcDk81lP7VyZXqPlDLZCpFXZYAwxkhj+JN0Kl0OgsBKee3QY0EqycbyBp12RJgYUilNMOhDYun3QkgsYRAQhrC+4hOHApMkQITrQBTHeCkXT2jOPfo0ygiu9dYjpRRBENh0Kl02hj8xxshX5j7yFdRPli5Nf6hSKb+j2WrFrybUXS38OY5mZXadjdUecaTJ5Ur4/QARJrTWmgz6IQJL3Inp1Vs06k06rQ7KCsrFHDYyaEeSK3hcmpqmXW/hOM7mzQDBqyWllFI1W624Uim/Y+nS9IeEEMnLTUG+6PUfeOAB25qfrzqO+v1er2u28vjXfMUy1tBvDbAxhEFIp92nMrKN85fX0UnM5edXGdRDWqt1ivkUGc8j5XrURqps37uDOEowSUy2mMLv9Jl/fgbHdTZZcI2cFELIXq9rHEf9fmt+vvrAAw/YF6PCi0LK48ePm37U+/VisTgaBKF5LRel7yUXAhMYOvUGxiYYY5i9vECulufoP3sXerjAobfegahUmPyR27npp4/SMYqHvvUUzy+s0g8MSIUJExzPIe+5zD07s5lY2dd0/ZdBEJpisTjaj3q/fvz48Zfk01tImKWlmWEVcn+73bFXCxmvzvwtQkv8xoDmwhqeEkSRoVqpcfH8MvFIg7E3HebQzYdeonQShpydaVD5+hmarTr9cAwbGWJtwRry1SytlQbdZod0Kk1iExDX7JpUu92xSqr7l5Zm/hhYs9YKeerUKS2EsHKQfLhULlajKEqu1eu/MgESaY/VpTU6KxsIrYn8CCfrMvXcDJ//d3/JV/7syyRGYhAkwkI2xTv+xQf46X/5E7zn544yfsc+Oh0fISRWSPKlLEQB/fU2eA6vhQNCCBFFUVIqF6tykHxYCGFPnTql9d/8zd8kU1NTroFfHPQH9nqo/xLUVnHqm49jECgpGQQhSml+/rc/zp2HHsLzYtxiEZmEIAUWAVGDw+99F0FjnWdOfgdjJVYIYhOTyqfwbURzcY2R3ZPE9jXXsuSgP7AGfnFqauqTDz74YKweffRR+3u/87Hbs+nUvx74vr0u5wdorakvrJBKF4g3uvTqGxTLWfxWD5WC2+65k4nDe1HZDNZCt9vD9TwwBuMHaCXoNrpszCyhUy6DIMZLZzHWIPIZduzdRWxiXgtJhRAijmObzWSGtZZffM973zcvAYSN35dKedhryTSucpIkJj9U4Ma7jpDIhE47IIlj+kqzdPEs7blZVCqDSSKElLiOuxnWkCAlaniE5fU+kTRY6zHoa4IoIZNVOEmfKPKRSl5PEdekUh7Cxu8DkFNTUy6Ge3w/4PWgP4CQgkG/y2Z1zzDwAzzHYXTHJNXJcUwKEgsmMTiuS6fTIY4idHmI2bPzPPrQd3AyOYLYMAhDotjgplPEScSg37+me8H3MwPfD8Bwz9TUlCsrOXevVGrvIAi4Xvq/lAZLQTTwSXp9vJRHs6HIpAp8++9O89UHH8PqFE62hMzksI5AeBKdz7I+u8KffOyTaD9GqTSJEYRxjB9FIARhGBJF0XUBIISQgyBAKrW3knP3agm3ep7n9ft983oAgAUhJe1OC8+VeGmPfi8migIymQLf+F9Pcen8OnvvuoGJPRNs2zdEJpdh5ewlHvv8w+TwsDLCH4QMwgjpuAjtYAWk0mnird6CFoLXCoNJEpPJZDwzGNyqQRzWWr2ovNenSyQdOqsNPE8htQe6yyAOcFI5ioUyjYt1Hpl6mJF9VQ7dNkFZezR7ffrWZe8dR3j28WlmzjcpDEncXB6lPJxcnmy1RhRbpJLXawZ2U2ZxWFprbo/j5HXpEr1YlEiCmAvfeQaJxSIx1uL3QmxiEcKCK3BqJUr7dqDGhml5Lgtdy567DuMNZ+gMF9moFagOV2kkCZd6A+YGgq7vkXR9pFDXqy8RxwnWmtslULlONL8HqzG4nsfauSs0Ll3Ay2YQ2qAFbDQ7rLRaLPoxxaEqldEas/UOjlZ4lRxn6y3OXlhgZm6RpuPi51JkygVi7TDVt5xuG568dIn5uXlMbLcSQXs90QCgohHsC8Pw9WHA1hOeP3WabCmLEgrPdWiW0oSHDzBQmnAtJl/OEfo9nry4gvzOLG/YN8KoAxNVjaBIMLdK6EjinEdhOMeOTJri+A4y7Q3Ot1ap1jc4uK1CL4yRV3ltIQX26hVlEYYhCPZJLVVhq1EprrNLinZc6vNL2CRk922H8eOIRMSk948jDu9DjlXJD6cYu2GE4kQNVapybj3mocenKVzo88xnv8W2vUN85FfeiQkDuqHgxrfcSHZHga4XEdkIP5vh2foaBo3a8tnGmE3nKxRSOoCDP4i2NCK+b0JkjEFLVZAvtqiv2tG4hvCntWZtcYnqUAUw9IUh9iC9cwTHyyCzKdJDaXbffZAb33qE7FiG4s4c3eEibjrHXXsmOfvCLNW0y2/e/y7KJc3Ntx9EpD206+JmPXqFHBudAQM/ZBD4RCbCKEFAQi/q0x606Q3WkQqMEfygWBEnidVXI75CYB1FbBJk8oMMxG7iLCCOQnw/ZGRiBysz0wjPpVgqs+YqbJJgXZc47aDTkozrUd5ZInQypNt91r55kRt//E386k/fwvzcOjfddpCV7RnmL02T1Q5rPZ9eJccgTIhWW1xamGfvnh2UylWMVlibEPg+nXYLR2oybo52s49S6gcqUiqpxCudoBCCIOjTXl1FGrN1ObYv5d+bxNr6kRbJplOKoohioYhOpUgcEK6L56WxnQEdvweug/Y0+bRD1suQr5QwlTTbYktpOI/YX8V0AmqjQyRhxMj4DobLJZy1NkJabCGPtJLFK6u0g5DqUIWEBGsiJJB2UxTzFfL5EeLEEpvwBxZTtVJCGiHaruNisFYYi7RbXVxpyGYNS88/iwoStPLYajBsqltYEGBxsMrZAtlSqBYJTYyT9VDZFFHOw2n3qKQ9RJJgBzFKubjaxbEG5ShwXTYOTfLU6VmWL6+Qq9QQShKHIeO7d1OQkkHbR8QJ1UqZ3YcmieJN7cZoNlUgQQq0Y9AapNabQxj2Kv19KYmTpC37i3Pnrd9DaWWlozHWYIxFaUl1d5HacJbFx09jES9Zgd0sttFLAoK1eWy7j5AKkSSUt1UwMqZnYpxUiuXQAddjtDNABAMcPyE2kHLSZLRGhILGrhrrb97J0ybmz778JF/+2tMgPaTSQMJtd+wnbS2qF+EOAmrbM8QpWFlew3NclJEoYxj0m2zUFzBE5PM5srkMcRJ/P39lXdcFOK8++oGffH+8urpn6cqidTJZkS1VwBgSE+B5lvKOEVqLi3SW1snu3AFxgiMUURCQKYHsrtJ4boH8+CSN5hqN5RWU67JtZIL1jRUa2uLdMk5fxph+REZobjk4SSadY6He4EqjhZKWuNsm5WQJEofHHz1La22NnZNVbBIzMTlOioSLl5dIux5SJmRyaRobK3hRnSRcpl6fo9/vUy6N4Xl5kiRieXmJbCq7dT/ZNNNNMxbWdV0RxdFz6uMf+tlDIzftfIt/adGs/u1Tsn9pg2I+jZ/0yVbTGAyFoRIbT0yRsw6pTp+kXifUAaXtRRKt6J06i5GSzKhD8MIVtnsVNDBXSCjuHSHq+hBD0PFxEdx24y4QmrS0TD11BmE0cdvSr/tEGz7t9R65jOaWI7vodFrkPIed49tYXltmYXGJguuStLs4ImJHMYWhj3aLDNf24nlFEIqu32LxuecZ6YPotHGabVSrg2p1Ue2uyQaxTDYaD8p+qz2VDAJqB3cJV0qWv/oEz3z6IXQiUFphgxhdylPaUSOZvYTrhMS2TW5HDmsi0qkUOAKV6zC0u4BMxQTr83REAzzQ2iWVTuMPfPxBn267Rb3Tpt1usm1kiPe/7Y30zi1Qn56jNTtPa3UZR0XcfsfNpHN5wjCi3ewghOXH7zjCPmPZR5rJQpUD28qk8wqdHqE2egCdymGlJQoDhLGMTowQRg1c0wd6QB9BD0tXxHELkv6UppM8vfitZwPT8T0tE3LFFKvPLLJx6gojRypE1mAHPpmdo2xsnCVb85Ba42YVNgoQEuKiIF3IYIxHVmdZD5tMHD7MTfPrTF9YxVMuezI51sImdCPCehe3Iuk0Ew4c2MV9v+DRaPZJZS2RH1CWaUbGhrCOwPHSbNSblCoVitUyb/wnd3Ll2Wkmx/cRd69gOga3XIG4yyC0tAcN8pkapcIQUXcDLysRWiNfqvVYUmgpTRzoYPC0DmeXZ3Q5P1Pw7Y1hu2+0RKZzGaJBn06rjZQKx0B6OIcZ0qwuz1GbHMOEEUopRJSQLWaJ/WizIhSEVKplcvkMJjL4/ZCJe95K6/IVnjh/CWUdqPfQtfJm76DfY3xbjTGvzbkzFwj7HXrlDGsepMIMNhG0Wl0Gg4C0VEzu2YG/MsfiU98mpQyhl0KllummsiQiJq4NUyvt4kJvhhV9mVwqs5X3yxdzO5PNONLvt2bOTcQz+vDx4+ELv/17X9TCu1GExjhKSZV18fJZ6AVYY1HlAibt4JVyOJHFGcSodILIuUQ9H+lqtBJEkU+ifXSxiLExUaePjGIGrQ26i4vs21FkbanLmVNT3DlcIjNUhn7IN/7qC3QvzbK6OKDTblIqeEz+xFuYvOUGbBDSb7dZXVpm5w37sFHI7hsOoAcJUX0B2+8TNLoEdoM4CVGXF/jucxdZuWEXqe176cYRCAM2vVm0t5iiU5D1ePmL94q7Qw2Q7Sdf8An/VWKttAiko9BaIuKYOIgJUj7azSClg0hCkjDChhFKpIijiCRJNu/orR42pbEZhQlDgk4DKX06ywuMbt+GuGEnrcenWPzGaeafvUBhYhRtQvxOl9Xzq3TbdQahj26lMKtNegvrJH5I1OuyaheY3LsXA5hcisLkdhaWzlMsZMmUva3gnAWbUI76FOZmqcdjJGI3SuotFmwGcLGRpRJMfgFAHzt2TLaf57Sqxs+nM6mD3X7XxJGRUkpMYomjGN3sQSaFiWKsMS+VpzxrMX0fYS3S1YSrdXRs0ZkUcb+HMQHZQoZctUK6WMAtZHjT6FGKuRzri+vEvQzr7QZuLks25dFe9EEZwihksNFkeX4Rk1g0giiyWD9A5UqYzhJR4CNiQTrnkcQhL07kWaGRqRRDhFS7Z1g3EPdHkUphrDVpLycGfuf5VG/x9LFjx6R8z9KSOvzg8dAI+RmFFHFijKMdrLHYyKKNJWp1ScIQWj5eBFZYHKmQfkRnaQ1HaZTSBP0BTtojk87QWK8TmgQZQ3+lRbqUQ2HRnsO+Q/uYODjO6IEJMoUcQRKjsi6DJCYJE3JjQxR3jlHbM8nEnbcwunMnZ755jv/8H/4H9fV1HAeaZ87Sn1tF+iFREm+WX4XF2hgR+iRemmytSLWwSDbXopyLKOd9MzZsRTHT/8zhew+H79n+HrU5SSUEFz72B0PNTvP53nq3Mggcdv3MG0TxpjQiiYiCgNTwdha//DjV20ZJD1VxKwX6gU97aoZitQK1POuXFiiWKpTHh5i7ME+unTB4apZWOU1wwx5q22tUa3mSTkCv5+Mbg9Ye3ZUNuqt1NlbW0K5maHwUozyCbkS/2aSzvEzYjPj6s3V6nuSdb95F0mmQo83eYcXIcA0Km1UiYQXCCmQ2h1OqEAcBYXEXTnbIep5GCOo6Zw7lcnvWALQQwtoTJ9Tee+9dffxjv/tHNad07PxcL7ZKay00YTDAcV1604uElxtk3rYLsXUHD+ZW8YRCpzzqF+aRYUy+VmVlYY50J6T7bIP5RZ95N8d3/+sjTG5PsW/XOI6y2KRLZnuNsW17sDHMX5wlm0qjpCRxNNp1UPUOUb0FUpEfy/Nzt97IVx45zcP/+xz7D4+y68bdnO3W2VhMGI0dsnkNSiEcxaAToJrLxI0uphSx8x27k0Iup5fnFv9o27YbVl8cBxAva4+L+3bXyknoTTXrveEol6YyUZOOZ0mXXc6fOEO1WmL83TuxKcVGu018qUlmLEenE2KXOhRuHsNEIYP5NeYXIp45s0YvX2a56zNaTnPzDUX8Th+3mGPPkQNUtg8RRzHWQtjs8tyTpyGKueGOI+TGakghOPv4M2xcWUVISSGbJYwEj525TKfX4IZD4xRrWaIowTOGWsnl8L5hTKwZRBEqivC7LchWzdf+7jusryyvHrnr7sPPrK83HnjgASuEsOKVAxLdxXP/PNUK/vzcqWdiP450qZwmmVlj8avnOPJrbyG9q0yn2aY9v45XLWEbXbrzdUb3T9Luduiv13mqaZnva7IjOZJBTH2hwa13TODYAcO1EfbccQSZ9kiiCMvmldXLZugsbHDmW0+QdjROPkuiJVF3gOjFhH5Ec7VBuVJh7K6DXJmd5/TT06RzaSojWbTn4gcRE6bFvmKRCIV2FZaIK5fX4j/9T5/RM/OXfuG78BcfAPXgZtfmH5Y57IkTStx7r119+pt/70n9jitnziaO46kLn/kGe+/eydh7drP6+CL1qSuU79qJXIxYf26J9B076LcDWs+u4O8f5cqQi5BpPFfjdwaUMoKR7RmGt4+x/+ABApsglEVgEMB6a0Cv1SNubBC1e1gTI7Qiigf4Ax8VpUEo/MCnOFxldN8k1aEy6+urnJ9ZZL1bp+d3SWVLnD55nm3hgPHYJ20Tev1+8uS559R8ff3hz1++9GMP3nuvuPfBB5PvOyu8NSRlznztr/ek2tF3pRHFIPZFvN4TE7tqNGZWWPjrJxk6PEGv3+f8QNA4PEqIYjDrowMo7i8TViWBAYmgoGMOjA9THqoweWg/fhAQRQFBPKDfs3z7qUs89fQsptejrAQmNmybHCJd0qg4AQ8mijmIBhx4wxspbqsS9wcYLI6jkI6DPwg5f/Ei55dmOffEGmsLASrwmRhJ21ynYU+fPtVq1+fu/PzMzIVjII/z0vjxPxx/E0IYe+KEEu9434UX/vuffySXrzwY+2HUSRf0U4+eF2unLqJLJVYur7JYq7L25km8fJp0kBD02tggJh4tMBA+SZIwnFPsGqmSz6ZxPMXS3ALdIKI7WMNLHL56aoGF+R5Ls2tMHJpgdc1nYW6RK0nAiJdj/WKL5TjgDXeO8bb9Q2wszOMU0liToJQkiBNstPn3TYdvpNXvcN5rYVSP3I01a/aOxIkvnP27xz/y8d/5zQsnTpxQ925tnHyv9PeKc/zBB+3JYyf1nb/xM1PvfOPbSwmpN7e67dgZKqrUTeP0K2ma1SzdkSw6NkgSYhvT7/oElRR+yUFZi44T3nb7PjLZFFJJhDVEUYQxQJjw3GqD+YU2w32DV9SUSml6rT4q61E7OATrXfaM19iuBJdnNpjuhEwOScqVIXA1BosQEikExhqsjVGB4crlRZobHVzXi2vbCk5jrfmHv/ux+z9x7Ngxff/99yf/uPb5fc5fPPoX9uTJk/rH/un7v/Qr931wbHLPtjsTEcSeo2UukyaX9ijHUIoSnG6fVD1AtRNcKYiJEVHADaOjbB8fIg5DpBQIoRDSEJiY7/ZDTp2r01/cYPLmvYxMjICfsLzQpOeHlLNpxrZvw8tp1iy0L62S2reNrrRMphSZYgEjBJszyxZrDbFJSKcypHttSnknDgbSaXX6f/pvP/Zr9x87dkwfP348uZZhafv2t789sdZKIcRHTn3xBIVK5b6luZXI7w6cJIjBWLS15BPNIA7xkgDd8MlUhomUYfdImiSJEGozQdHaIehanpxfYrqVMP30HEpr1k+9QC6T0FyPWJ3v4Xe6rK13mB3KY5VidRATknBnv0fDLbG2Uic3VEEVsxglUEJgt8p42nUojQ1FqWzKqQ73//RdP/vzH9mSIblaG0n/gB6ftdZiT1gl7hEfuXD6G9yyZ9d9Tz92KmmcX5LSKmGMJY4GBARUDo+y6+Z95EpZup0umeEKYRIjhETriKjf59EXFrliDBsPn0Wn0mSzGdKuoFROEQ5aeOkI0RNEQqByDpVynmS9QdMWmL20zNjIEKf7MRN7Y2JngFQCKdTmRoox1pjE3HDogPPtRx57UXjFpsOz1zwu/zIQzItMWLx8ppctFT665q4jOkGSBJGyOc2db72bHbvH6Qufrt+jkK1iDWi52RiVxuObp57nvLCkztbZM1ZlPe4gZALao91PiKUgnRGUsi5NCdYTBCrBy3k4vmXQCfEXNrg0WaRlEvKBT5SSaJnGWJt4rqvS6ZTqdPt/+CP33PtbWyOxP3StTr6Kbq9lEwi5feeR32p3ux8c2lXbKI4XVO3wWPy2n/tJu/v2Q5i0AilJe6nNcRcLjnBwteWJp6Z5bKGN22xR7nY4+p7b+am7D5BKKfpBSKPVpdPp4IaGSiQxWtDTko04ooOlNpTjnT96G+PWBxHw+MIaiS8J/cDG1sTFUlE5jt4YDPofrFb3bQq/uUhlf/hM46vreW6CsLmQdOJvv/Cp00feeusnd9xw47v8sEOv14utQinXEcnAIKQh5aTARJybafCVh8+Sd1x2FiTzKUHP+rzh0E72Tu5gZrnD4so6/dUW3uUGKnC5pEJS1lLLZzh46zD7x2sMuh1WmhmiYp6Z2NqRxY3k6MQeHXta+0HwlUar9Rt7dtwybe1J/fJN09cFgJeAOHo03lpUnEaIH280L/6SUvrfVcsj23t+i163FwthJcLIc+cWuXh+iUe+9Bhj5TJ3765SKGT5zvPnefZ8k7E3VankBXdXt9PbPURrucFq60lEJU15uMzYoe1s31Yik3Pw/ZB6s88T83UzMlIwmaGUPjPX1+XnG4t79uR+b2LHkU9/b6Xv2pYor3kk5ujRo/GxY8ekNUaUi7s+3bPBrX44OG6SaCWTdrXfE/Lk3562f/mJz8af+/d/YPoXnrBH797NyK0jDMYqdCKHJ6cu8cJcE8fJYaIQYWIaly6jOn0yGUG1YBkdK6BSiU2ITRS68eOPz9qFVV/WsiVtbWqlpezxe37xD26d2HHk09ZaYa2Vr2WD9HVbnT1z5n+OhH71w5/7s4c/tHT61E2ts4/hBx22HTzIuz94r9l503b73fN18fDjy+THh0S+5Ig7929ncqRGq9Om+d0pWw6ljUg4EyS2emhM7N+7XfZih6mzi0yfXyRa7z37ltvGP9e86ebP/sd3vvH/3+rsD1qeBtSbth+4Kx2uvldZ+W4K+f1vfvePere9/XZOnprj0qomu6OMV5BEgw5BqLCLbd5ZTeGamJGDI3z9zAbfmmuwfc9IoHPOtNTiSzaJHvrcwZ1PsJXKbqa1HzBwfcvTmuufCbJA8uL6vJQifmzx7LeBbwO/+9e/928ObN+948aFxuqtrsrcpt1+2XHi/Y7yCtZzba/XZ1cKoTqddjOKpreldjZSOnwqFamnM9Z77kM/cvPZl2v42LGT+oEH3p68DPDrOv8H1M5/i/yBIA4AAAAASUVORK5CYII=";
        this.apiBase = "https://snow.modaweb.kr/api/yuiko/";
        this.commandPrefix = ".";
        this.autoSend = true;
        this.queuedItems = [];
        this.contis = [];
        this.contiView = false;
        this.queueStatus = null;
        this.longPressTimer = null;
        this.suppressEmojiClick = false;
        this.unbindGridPress = null;
        this.version = this.getVersion();

        // Git 참조로 최신 커밋을 확인하고 해당 커밋의 파일만 받는다.
        this.updateRefsURL = "https://github.com/awizc/YuikoStickers-plugin.git/info/refs?service=git-upload-pack";
        this.updateAPIURL = "https://api.github.com/repos/awizc/YuikoStickers-plugin/contents/YuikoStickers.plugin.js?ref=main";
        this.updateURL = "https://raw.githubusercontent.com/awizc/YuikoStickers-plugin/main/YuikoStickers.plugin.js";
        // 실행 중에는 매 정시(00분)마다 GitHub 버전을 다시 확인
        this.updateTimer = null;
        this.updateInFlight = false;
        this.lastPluginUpdateCheck = 0;
        this.updated = false;
        this.running = false;
        // 껐다 켜기 전의 비동기 응답이 새 실행의 상태에 섞이지 않도록 구분한다.
        this.sessionId = 0;
        this.groupsLoadToken = 0;
        this.pendingSendTimers = new Set();
        this.dragCleanups = new Set();
        this.dragResetTimer = null;

        this.groups = [];
        // 그룹 대표 이미지 (그룹 id → 그룹의 첫 번째 이모지 URL). 그룹 탭에 이름 대신 표시, BdApi.Data에 저장
        this.groupThumbs = {};
        this.enabledGroupIds = null;
        // 그룹 표시 순서 (그룹 id 배열). 설정창의 ▲▼ 버튼으로 변경, BdApi.Data에 저장
        this.groupOrder = [];
        this.selectedGroupId = null;
        this.items = [];
        this.itemByUrl = new Map();
        // 지금까지 받아본 모든 그룹의 이모지 (URL → item). 그룹을 바꿔도 즐겨찾기/최근 기록이 지워지지 않도록 전체 목록을 기억
        this.knownItems = new Map();
        // 그룹 탭을 빠르게 연달아 눌렀을 때 마지막 요청의 결과만 반영하기 위한 토큰
        this.loadToken = 0;
        this.lastDatetime = null;
        this.lastCheckAt = 0;
        this.checkInterval = 60 * 1000;

        this.favorites = new Set();
        this.recent = [];
        this.maxRecent = 50;
        this.sortByRecent = false;

        this.panel = null;
        this.button = null;
        this.grid = null;
        this.status = null;
        this.searchInput = null;
        this.preview = null;
        this.previewImage = null;
        this.previewSize = 180;
        // 설정창 그룹 행에 마우스를 올리면 뜨는 그룹 미리보기 팝업
        this.groupPreview = null;
        this.groupPreviewId = null;
        this.groupPreviewCache = new Map();   // groupId → 미리보기용 이모지 (세션 동안만)
        this.groupPreviewCount = 12;
        // 포인터 드래그 정렬 중인지 (드래그 중엔 호버 미리보기 끄고, 끝난 직후 click 한 번 무시)
        this.dragActive = false;
        this.suppressNextClick = false;
        this.observer = null;
        this.addButtonTimer = null;
        this.composer = null;
        this.savedSelection = null;
        this.onDocumentMouseDown = null;
    }

    start() {
        if (this.running) return;
        this.sessionId++;
        this.running = true;
        this.updated = false;
        this.checkPluginUpdate(true);
        this.scheduleHourlyUpdateCheck();
        this.addStyles();
        this.loadFavorites();
        this.loadRecent();
        this.loadSortSetting();
        this.loadGroupSettings();
        this.loadGroupThumbs();
        this.loadCache();
        this.loadContis();
        this.loadGroups(true);
        this.observeDiscord();
        this.bindAutocomplete();
    }

    stop() {
        this.closeContiEditor();
        this.contiView = false;
        this.unbindAutocomplete?.();
        this.unbindAutocomplete = null;
        this.closeAutocomplete();
        this.running = false;
        this.sessionId++;
        this.loadToken++;
        this.groupsLoadToken++;
        this.updateInFlight = false;
        this.cancelLongPress();
        for (const timer of this.pendingSendTimers) clearTimeout(timer);
        this.pendingSendTimers.clear();
        for (const cleanup of this.dragCleanups) cleanup();
        this.dragCleanups.clear();
        clearTimeout(this.dragResetTimer); this.dragResetTimer = null;
        this.dragActive = this.suppressNextClick = this.suppressEmojiClick = false;
        this.hideGroupPreview();
        this.unbindGridPress?.(); this.unbindGridPress = null;
        this.queuedItems = []; this.queueStatus = null;
        this.observer?.disconnect();
        this.observer = null;
        if (this.addButtonTimer) clearTimeout(this.addButtonTimer);
        this.addButtonTimer = null;
        if (this.updateTimer) { clearTimeout(this.updateTimer); this.updateTimer = null; }
        this.panel?.remove();
        this.button?.remove();
        this.preview?.remove();
        this.groupPreview?.remove();
        this.panel = this.button = this.preview = this.groupPreview = null;
        this.previewImage = null;
        this.grid = this.status = this.searchInput = this.composer = this.savedSelection = null;
        this.unbindOutsideClick();
        BdApi.DOM.removeStyle(this.pluginName);
    }

    isCurrentSession(sessionId) {
        return this.running && this.sessionId === sessionId;
    }

    addStyles() {
        BdApi.DOM.addStyle(this.pluginName, `
            .yuiko-conti-tab { font-size:23px; }
            .yuiko-grid.is-conti { display:block; }
            .yuiko-conti-card { margin:0 0 10px; padding:12px; border:1px solid var(--background-modifier-accent,#41434a); border-radius:10px; background:var(--background-secondary,#232428); }
            .yuiko-conti-heading { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
            .yuiko-conti-heading strong { flex:1; overflow-wrap:anywhere; }
            .yuiko-conti-card .yuiko-conti-heading { align-items:baseline; padding-bottom:6px; margin-bottom:9px; border-bottom:1px solid var(--yk-border,rgba(255,255,255,.06)); }
            .yuiko-conti-meta, .yuiko-conti-empty { color:var(--text-muted,#aaa); font-size:12px; line-height:1.6; }
            .yuiko-conti-actions { display:flex; gap:6px; margin-top:10px; flex-wrap:wrap; }
            .yuiko-conti-action { border:0; border-radius:5px; padding:6px 10px; cursor:pointer; color:var(--text-normal,#eee); background:var(--background-modifier-selected,#41434a); font:inherit; font-size:12px; }
            .yuiko-conti-action:hover { background:var(--brand-500,#5865f2); color:white; }
            .yuiko-conti-action:disabled { opacity:.45; cursor:default; }
            .yuiko-conti-action.is-primary { background:var(--brand-500,#5865f2); color:white; }
            .yuiko-conti-strip { display:flex; gap:6px; overflow-x:auto; padding:5px 0; scrollbar-width:thin; }
            .yuiko-conti-chip { position:relative; flex:0 0 54px; height:62px; box-sizing:border-box; border:1px solid var(--background-modifier-accent,#41434a); border-radius:7px; background:var(--background-primary,#313338); cursor:grab; touch-action:none; }
            .yuiko-conti-chip img { width:42px; height:42px; object-fit:contain; margin:4px; pointer-events:none; }
            .yuiko-conti-chip small { position:absolute; bottom:1px; left:5px; color:var(--text-muted,#aaa); font-size:10px; }
            .yuiko-conti-chip button { position:absolute; right:1px; top:1px; border:0; border-radius:50%; width:18px; height:18px; padding:0; color:white; background:#202225dd; cursor:pointer; }
            .yuiko-conti-chip.drop-before { border-left:3px solid var(--brand-500,#5865f2); }
            .yuiko-conti-chip.drop-after { border-right:3px solid var(--brand-500,#5865f2); }
            .yuiko-conti-chip.is-dragging { opacity:.4; }
            .yuiko-draft-tray { padding:8px; margin-bottom:8px; border-bottom:1px solid var(--background-modifier-accent,#41434a); }
            .yuiko-draft-tray .yuiko-conti-heading { font-size:12px; }
            .yuiko-conti-mini { display:flex; gap:2px; flex-shrink:0; max-width:116px; overflow:hidden; }
            .yuiko-conti-mini img { width:34px!important; height:34px!important; }
            .yuiko-conti-overlay { position:fixed; inset:0; z-index:1000004; display:flex; align-items:center; justify-content:center; background:#0009; }
            .yuiko-conti-dialog { box-sizing:border-box; width:480px; max-width:calc(100vw - 32px); max-height:calc(100vh - 32px); overflow-y:auto; padding:22px; border-radius:12px; color:var(--text-normal,#eee); background:var(--background-secondary,#232428); box-shadow:0 16px 48px #0008; font-family:inherit; }
            .yuiko-conti-dialog h2 { font-size:20px; margin:0 0 18px; }
            .yuiko-conti-dialog label { display:block; margin:12px 0; font-size:13px; }
            .yuiko-conti-dialog input { box-sizing:border-box; width:100%; margin-top:6px; padding:9px 10px; border:1px solid var(--background-modifier-accent,#41434a); border-radius:6px; color:var(--text-normal,#eee); background:var(--background-primary,#313338); font:inherit; }
            .yuiko-conti-error { color:var(--text-danger,#f58a8c); min-height:20px; font-size:12px; margin-top:8px; }
            .yuiko-conti-add-results { display:flex; flex-wrap:wrap; gap:5px; max-height:110px; overflow:auto; }
            .yuiko-autocomplete { scrollbar-width:thin; scrollbar-color:var(--background-tertiary,#111214) var(--background-secondary,#232428); scrollbar-gutter:stable; }
            .yuiko-autocomplete::-webkit-scrollbar { width:8px; }
            .yuiko-autocomplete::-webkit-scrollbar-track { background:var(--background-secondary,#232428); border-radius:8px; }
            .yuiko-autocomplete::-webkit-scrollbar-thumb { background:var(--background-tertiary,#111214); border:2px solid var(--background-secondary,#232428); border-radius:8px; }
            .yuiko-autocomplete::-webkit-scrollbar-thumb:hover { background:var(--text-muted,#80848e); }
            /* 채팅 이미지 위의 Discord GIF 배지만 숨김 (움직이는 이미지는 유지) */
            [id^="chat-messages-"] [class^="gifTag_"],
            [id^="chat-messages-"] [class*=" gifTag_"],
            [id^="chat-messages-"] [class^="embedGIFTag_"],
            [id^="chat-messages-"] [class*=" embedGIFTag_"] { display:none !important; }

            /* 테마 색상 토큰. 기본은 다크(디스코드 어두운 테마 3종 공통), html.theme-light면 라이트 토큰으로 교체 */
            .yuiko-panel, .yuiko-preview, .yuiko-group-preview {
                --yk-bg:#1e1f22; --yk-bg2:#2b2d31; --yk-bg3:#313338; --yk-bg4:#383a40;
                --yk-text:#dbdee1; --yk-muted:#949ba4; --yk-heading:#f2f3f5; --yk-active:#ffffff;
                --yk-border:rgba(255,255,255,.08); --yk-hover:rgba(255,255,255,.06);
                --yk-shadow:0 8px 16px rgba(0,0,0,.24);
                --yk-scroll:#3f4147; --yk-scroll-hover:#4e5058;
            }
            .theme-light .yuiko-panel, .theme-light .yuiko-preview, .theme-light .yuiko-group-preview {
                --yk-bg:#ffffff; --yk-bg2:#f2f3f5; --yk-bg3:#ebedef; --yk-bg4:#e3e5e8;
                --yk-text:#313338; --yk-muted:#5c5e66; --yk-heading:#060607; --yk-active:#060607;
                --yk-border:rgba(0,0,0,.1); --yk-hover:rgba(0,0,0,.06);
                --yk-shadow:0 8px 16px rgba(0,0,0,.16);
                --yk-scroll:#c4c9ce; --yk-scroll-hover:#a8adb3;
            }
            .yuiko-button { width:32px; height:32px; margin:0 2px; padding:0; border:0; border-radius:4px; background:transparent; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; }
            .yuiko-button img { width:24px; height:24px; border-radius:50%; opacity:.75; transition:opacity .12s,transform .12s; pointer-events:none; }
            .yuiko-button:hover { background:var(--background-modifier-hover); }
            .yuiko-button:hover img { opacity:1; transform:scale(1.1); }
            .yuiko-panel { position:fixed; z-index:999999; width:514px; height:600px; max-width:calc(100vw - 20px); max-height:calc(100vh - 20px); display:flex; flex-direction:column; background:var(--yk-bg); color:var(--yk-text); border:1px solid var(--yk-border); border-radius:8px; box-shadow:var(--yk-shadow); line-height:1.4; }
            .yuiko-header { display:flex; align-items:center; gap:8px; padding:10px; flex-shrink:0; border-bottom:1px solid var(--yk-border); }
            .yuiko-title { color:var(--yk-heading); font-size:16px; font-weight:600; }
            .yuiko-search { flex:1; min-width:0; padding:8px 10px; border:1px solid var(--yk-border); outline:0; border-radius:4px; background:var(--yk-bg2); color:var(--yk-text); }
            .yuiko-search::placeholder { color:var(--yk-muted); }
            .yuiko-group-button { box-sizing:border-box; user-select:none; outline:none; }
            .yuiko-manage-toggle, .yuiko-group-button, .yuiko-sort { padding:5px 8px; border:1px solid var(--yk-border); border-radius:5px; background:transparent; color:var(--yk-muted); cursor:pointer; line-height:1.4; }
            .yuiko-manage-toggle:hover, .yuiko-group-button:hover, .yuiko-group-button.is-active { background:var(--yk-hover); color:var(--yk-text); }
            .yuiko-body { flex:1; display:flex; min-height:0; }
            .yuiko-groupbar { display:flex; flex-direction:column; align-items:center; gap:6px; width:58px; box-sizing:border-box; padding:8px 0; flex-shrink:0; overflow-y:auto; overflow-x:hidden; border-right:1px solid var(--yk-border); }
            .yuiko-main { flex:1; display:flex; flex-direction:column; min-width:0; min-height:0; }
            /* 대표 이미지가 없는 그룹은 이름 첫 글자로 표시 */
            .yuiko-group-letter { width:34px; height:34px; display:flex; align-items:center; justify-content:center; border-radius:6px; background:var(--yk-bg2); color:var(--yk-text); font-size:13px; font-weight:600; pointer-events:none; }
            .yuiko-group-button.has-thumb { padding:3px; width:42px; height:42px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
            .yuiko-group-button.has-thumb img { width:34px; height:34px; object-fit:contain; border-radius:4px; pointer-events:none; }
            .yuiko-group-button[data-group-id="all"] img { border-radius:50%; }
            .yuiko-group-button.is-active.has-thumb { border-color:var(--yk-active); }
            .yuiko-manage-thumb { width:22px; height:22px; object-fit:contain; border-radius:3px; flex-shrink:0; }
            .yuiko-manage { display:none; margin:8px 10px 0; padding:8px; border:1px solid var(--yk-border); border-radius:6px; background:var(--yk-bg3); color:var(--yk-text); }
            /* 그룹이 많아도 설정창이 패널을 넘지 않도록: 최대 55% 높이, 넘치면 자체 스크롤 */
            .yuiko-manage.is-open { display:block; flex-shrink:0; max-height:55%; box-sizing:border-box; overflow-y:auto; }
            .yuiko-manage-row { display:flex; align-items:center; gap:8px; padding:3px 6px; margin:0 -2px; border-radius:4px; font-size:12px; }
            .yuiko-manage-row:hover { background:var(--yk-hover); }
            .is-dragging { opacity:.4; }
            .yuiko-manage-row.drop-before { box-shadow:inset 0 2px 0 var(--yk-active); }
            .yuiko-manage-row.drop-after { box-shadow:inset 0 -2px 0 var(--yk-active); }
            .yuiko-group-button.drop-before { box-shadow:0 -3px 0 var(--yk-active); }
            .yuiko-group-button.drop-after { box-shadow:0 3px 0 var(--yk-active); }
            .yuiko-item.drop-before { box-shadow:-3px 0 0 var(--yk-active); }
            .yuiko-item.drop-after { box-shadow:3px 0 0 var(--yk-active); }
            .yuiko-item[data-section="fav"] { cursor:grab; }
            .yuiko-item, .yuiko-group-button, .yuiko-manage-row { touch-action:none; -webkit-user-drag:none; }
            .yuiko-item img, .yuiko-group-button img { -webkit-user-drag:none; }
            .yuiko-drag-handle { width:14px; color:var(--yk-muted); cursor:grab; user-select:none; opacity:0; transition:opacity .1s; text-align:center; flex-shrink:0; }
            .yuiko-manage-row:hover .yuiko-drag-handle { opacity:1; }
            .yuiko-manage-row label { flex:1; display:flex; align-items:center; gap:6px; cursor:pointer; min-width:0; }
            .yuiko-manage-row label input { margin:0; flex-shrink:0; }
            /* 세로는 자르지 않고(overflow-y:visible) 가로만 clip → 배율 150% 등에서 받침이 잘리는 문제 방지 */
            .yuiko-manage-row label span { overflow-x:clip; overflow-y:visible; text-overflow:ellipsis; white-space:nowrap; line-height:1.6; padding:2px 0; }
            .yuiko-move { width:22px; padding:2px 0; border:1px solid var(--yk-border); border-radius:4px; background:transparent; color:var(--yk-muted); cursor:pointer; font-size:11px; line-height:1; opacity:0; transition:opacity .1s; }
            .yuiko-manage-row:hover .yuiko-move, .yuiko-move:focus-visible { opacity:1; }
            .yuiko-move:hover:not(:disabled) { background:var(--yk-bg4); color:var(--yk-text); }
            .yuiko-manage-row:hover .yuiko-move:disabled { opacity:.3; cursor:default; }
            .yuiko-grid { flex:1; display:grid; grid-template-columns:repeat(6,64px); grid-auto-rows:auto; justify-content:start; gap:8px; padding:10px; overflow-y:auto; overflow-x:hidden; align-content:start; align-items:start; }
            .yuiko-item { position:relative; width:64px; height:64px; min-width:64px; user-select:none; outline:none; display:flex; align-items:center; justify-content:center; box-sizing:border-box; padding:5px; border:1px solid var(--yk-border); border-radius:8px; background:var(--yk-bg2); cursor:pointer; overflow:visible; transition:background .12s,border-color .12s,transform .12s; }
            .yuiko-item:hover { background:var(--yk-bg4); border-color:var(--yk-muted); transform:scale(1.06); z-index:1; }
            .yuiko-item img { display:block; width:54px; height:54px; object-fit:contain; pointer-events:none; }
            .yuiko-section { grid-column:1/-1; display:flex; align-items:center; gap:8px; min-height:20px; margin-bottom:8px; color:var(--yk-muted); font-size:12px; font-weight:600; line-height:1.6; }
            .yuiko-section::after { content:""; flex:1; height:1px; background:var(--yk-border); order:1; }
            .yuiko-sort { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; height:28px; margin:0; padding:5px 8px; border:1px solid var(--yk-border); border-radius:5px; background:transparent; color:var(--yk-muted); cursor:pointer; font-family:inherit; font-size:11px; font-weight:500; line-height:16px; white-space:nowrap; flex-shrink:0; }
            .yuiko-sort { order:3; }
            .yuiko-sort:hover { background:var(--yk-hover); color:var(--yk-text); }
            .yuiko-preview { position:fixed; z-index:1000000; display:none; padding:10px; border:1px solid var(--yk-border); border-radius:8px; background:var(--yk-bg); box-shadow:var(--yk-shadow); pointer-events:none; }
            .yuiko-preview.is-visible { display:flex; }
            .yuiko-preview img { display:block; width:${this.previewSize}px; height:${this.previewSize}px; object-fit:contain; }
            /* 스크롤바: 테마 토큰 색, 얇고 둥글게 (그리드 세로 / 그룹 탭 가로) */
            .yuiko-grid::-webkit-scrollbar, .yuiko-manage::-webkit-scrollbar { width:8px; }
            .yuiko-groupbar::-webkit-scrollbar { width:4px; }
            .yuiko-grid::-webkit-scrollbar-track, .yuiko-groupbar::-webkit-scrollbar-track, .yuiko-manage::-webkit-scrollbar-track { background:transparent; }
            .yuiko-grid::-webkit-scrollbar-thumb, .yuiko-groupbar::-webkit-scrollbar-thumb, .yuiko-manage::-webkit-scrollbar-thumb { background:var(--yk-scroll); border-radius:4px; border:2px solid transparent; background-clip:padding-box; }
            .yuiko-grid::-webkit-scrollbar-thumb:hover, .yuiko-groupbar::-webkit-scrollbar-thumb:hover, .yuiko-manage::-webkit-scrollbar-thumb:hover { background:var(--yk-scroll-hover); background-clip:padding-box; }
            .yuiko-grid::-webkit-scrollbar-corner, .yuiko-groupbar::-webkit-scrollbar-corner { background:transparent; }
            .yuiko-group-preview { position:fixed; z-index:1000001; display:none; flex-direction:column; gap:12px; width:280px; max-width:calc(100vw - 16px); box-sizing:border-box; padding:12px; overflow:hidden; border:1px solid var(--yk-border); border-radius:8px; background:var(--yk-bg); color:var(--yk-text); box-shadow:var(--yk-shadow); pointer-events:none; }
            .yuiko-group-preview.is-visible { display:flex; }
            .yuiko-group-preview-title { display:flex; align-items:center; gap:8px; min-height:24px; flex-shrink:0; font-size:14px; font-weight:600; line-height:1.6; overflow-wrap:anywhere; }
            .yuiko-group-preview-title img { width:24px; height:24px; object-fit:contain; border-radius:3px; flex-shrink:0; }
            .yuiko-group-preview-grid { display:grid; flex:1; min-height:0; grid-template-columns:repeat(3,minmax(0,1fr)); grid-template-rows:repeat(4,minmax(0,1fr)); gap:8px; }
            .yuiko-group-preview-grid img { width:100%; height:100%; min-height:0; object-fit:contain; box-sizing:border-box; padding:4px; border-radius:6px; background:var(--yk-bg2); }
            .yuiko-group-preview-empty { grid-column:1 / -1; color:var(--yk-muted); font-size:12px; line-height:1.6; }
            .yuiko-status { padding:7px 10px; border-top:1px solid var(--yk-border); color:var(--yk-muted); font-size:12px; flex-shrink:0; line-height:1.5; }
            .yuiko-status:empty { display:none; }
            .yuiko-status.is-error { color:#f23f43; cursor:pointer; }
            .yuiko-status.is-error:hover { text-decoration:underline; }
            .yuiko-queue-status { display:none; padding:7px 10px; color:var(--yk-muted); font-size:12px; flex-shrink:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .yuiko-queue-status.has-items { display:block; border-top:1px solid var(--yk-border); padding:8px 10px; }
            .yuiko-queue-header { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; }
            .yuiko-queue-clear { padding:2px 6px; border:1px solid var(--yk-border); border-radius:4px; background:transparent; color:var(--yk-muted); font:inherit; cursor:pointer; }
            .yuiko-queue-list { display:flex; gap:8px; overflow-x:auto; padding:4px 0 6px; scrollbar-width:thin; scrollbar-color:var(--yk-scroll) transparent; }
            .yuiko-queue-item { position:relative; width:56px; height:56px; flex:0 0 56px; box-sizing:border-box; border:1px solid var(--yk-border); border-radius:6px; background:var(--yk-bg2); }
            .yuiko-queue-item img { display:block; width:44px; height:44px; margin:5px; object-fit:contain; }
            .yuiko-queue-number { position:absolute; left:2px; bottom:2px; min-width:14px; padding:0 2px; border-radius:3px; background:var(--yk-bg); color:var(--yk-text); font-size:10px; line-height:16px; text-align:center; }
            .yuiko-queue-remove { position:absolute; top:1px; right:1px; display:flex; align-items:center; justify-content:center; width:18px; height:18px; padding:0; border:1px solid var(--yk-border); border-radius:4px; background:var(--yk-bg); color:var(--yk-text); font-size:14px; line-height:1; cursor:pointer; }
            .yuiko-queue-remove:hover, .yuiko-queue-clear:hover { background:var(--yk-bg4); color:var(--yk-heading); }
        `);
    }

    observeDiscord() {
        this.observer = new MutationObserver(() => this.scheduleAddButton());
        this.observer.observe(document.body, {childList:true, subtree:true});
        this.addButton();
    }

    scheduleAddButton() {
        if (!this.running || this.addButtonTimer || this.button?.isConnected) return;
        const sessionId = this.sessionId;
        this.addButtonTimer = setTimeout(() => {
            this.addButtonTimer = null;
            if (this.isCurrentSession(sessionId)) this.addButton();
        }, 100);
    }

    findComposer() {
        const candidates = [...document.querySelectorAll('[contenteditable="true"]')].filter(element => {
            if (!element.isConnected || element.closest('.yuiko-panel') || element.closest('[role="search"]') || element.closest('[class*="search"]')) return false;
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            if (rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility === 'hidden') return false;
            if (element.hasAttribute('data-slate-editor')) return true;
            const label = (element.getAttribute('data-placeholder') || element.getAttribute('aria-label') || '').toLowerCase();
            return label.includes('message') || label.includes('메시지');
        });
        return candidates.at(-1) || null;
    }

    addButton() {
        if (this.button?.isConnected) return;
        const composer = this.findComposer();
        if (!composer) return;
        this.composer = composer;
        let container = composer.parentElement;
        for (let i = 0; i < 8 && container; i++) {
            const buttons = container.querySelector('[class*="buttons"]');
            if (buttons) { container = buttons; break; }
            container = container.parentElement;
        }
        if (!container) return;
        const button = document.createElement('button');
        button.className = 'yuiko-button';
        button.type = 'button';
        const icon = document.createElement('img'); icon.src = this.iconURL; icon.alt = 'Yuiko'; button.appendChild(icon);
        button.title = 'Yuiko 이모지';
        button.addEventListener('mousedown', event => { event.preventDefault(); this.saveComposerSelection(); });
        button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); this.togglePanel(button); });
        container.appendChild(button);
        this.button = button;
    }

    saveComposerSelection() {
        if (!this.composer?.isConnected) return;
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (this.composer.contains(range.commonAncestorContainer)) this.savedSelection = range.cloneRange();
    }

    contiItems(entry) {
        return entry.contiId ? (this.contis.find(conti => conti.id === entry.contiId)?.items || []).map(item => this.knownItems.get(item.url) || item) : [entry];
    }

    loadContis() {
        const saved = BdApi.Data.load(this.pluginName, 'contis');
        const aliases = new Set();
        this.contis = (Array.isArray(saved) ? saved : []).filter(conti => {
            if (!conti || typeof conti.id !== 'string' || typeof conti.name !== 'string' || !conti.name.trim() || conti.name.length > 40 || typeof conti.alias !== 'string' || !conti.alias || conti.alias.length > 30 || /[\s.,]/u.test(conti.alias) || aliases.has(conti.alias.toLowerCase())) return false;
            if (!Array.isArray(conti.items) || conti.items.length < 2 || conti.items.length > 30 || conti.items.some(item => !item || typeof item.url !== 'string' || !/^https?:\/\//i.test(item.url) || typeof item.name !== 'string' || !item.name.split(',')[0].trim() || /[\s.]/u.test(item.name.split(',')[0].trim()))) return false;
            aliases.add(conti.alias.toLowerCase()); return true;
        }).slice(0, 100).map((conti, index) => ({id:`conti-${index}`, name:conti.name.slice(0,40), alias:conti.alias.slice(0,30), items:conti.items.map(item => this.slimItem(item))}));
    }

    saveConti({id = null, name, alias, items}) {
        name = name.trim(); alias = alias.trim().replace(/^\./u, '');
        if (!name || name.length > 40) throw new Error('콘티 이름은 1~40자로 입력하세요.');
        if (!alias || alias.length > 30 || /[\s.,]/u.test(alias)) throw new Error('호출어는 공백·점·쉼표 없이 1~30자로 입력하세요.');
        if (items.length < 2 || items.length > 30) throw new Error('콘티에는 콘을 2~30개 담아 주세요.');
        if (items.some(item => !item?.url || !item.name?.split(',')[0].trim() || /[\s.]/u.test(item.name.split(',')[0].trim()))) throw new Error('사용할 수 없는 호출어가 포함되어 있습니다.');
        if (this.contis.some(conti => conti.id !== id && conti.alias.toLowerCase() === alias.toLowerCase())) throw new Error('이미 사용 중인 콘티 호출어입니다.');
        if (!id && this.contis.length >= 100) throw new Error('콘티는 최대 100개까지 저장할 수 있습니다.');
        const conti = {id:id || `conti-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, name, alias, items:items.map(item => this.slimItem(item))};
        const index = this.contis.findIndex(entry => entry.id === id);
        const next = [...this.contis];
        if (index < 0) next.push(conti); else next[index] = conti;
        BdApi.Data.save(this.pluginName, 'contis', next);
        this.contis = next;
        if (this.contiView) this.render(this.searchInput?.value || '');
        return conti;
    }

    deleteConti(id) {
        const next = this.contis.filter(conti => conti.id !== id);
        BdApi.Data.save(this.pluginName, 'contis', next);
        this.contis = next;
        if (this.contiView) this.render(this.searchInput?.value || '');
    }

    contiButton(label, action, primary = false) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'yuiko-conti-action'+(primary ? ' is-primary' : ''); button.textContent = label;
        button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); if (!this.suppressNextClick) action(); });
        return button;
    }

    createContiStrip(items, change = null) {
        const list = document.createElement('div'); list.className = 'yuiko-conti-strip'; list.setAttribute('aria-label','콘 순서');
        items.forEach((item,index) => {
            const chip = document.createElement('div'); chip.className = 'yuiko-conti-chip'; chip.dataset.index = index;
            chip.title = `${index+1}. ${item.name.split(',')[0]}${change ? ' · 드래그 또는 Alt+←/→로 이동' : ''}`;
            const image = document.createElement('img'); image.src = item.url; image.alt = item.name; image.draggable = false;
            const number = document.createElement('small'); number.textContent = index+1; chip.append(image,number);
            if (change) {
                chip.tabIndex = 0; chip.setAttribute('role','group'); chip.setAttribute('aria-label',chip.title);
                const remove = this.contiButton('×', () => change(items.filter((_,i) => i !== index))); remove.setAttribute('aria-label',`${index+1}번 콘 삭제`); chip.append(remove);
                chip.addEventListener('keydown', event => {
                    if (!event.altKey || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
                    event.preventDefault(); event.stopPropagation();
                    const to = index + (event.key === 'ArrowLeft' ? -1 : 1);
                    if (to < 0 || to >= items.length) return;
                    const next = [...items]; [next[index],next[to]] = [next[to],next[index]]; change(next);
                });
            }
            list.append(chip);
        });
        if (change) list.cleanupDrag = this.bindDragReorder(list, '.yuiko-conti-chip', {axis:'x', getId:node => Number(node.dataset.index), onDrop:(from,to,before) => {
            const order = items.map((item,index) => ({item,index})); const [moved] = order.splice(from,1);
            const at = order.findIndex(entry => entry.index === to); order.splice(at+(before ? 0 : 1),0,moved); change(order.map(entry => entry.item));
        }});
        return list;
    }

    closeContiEditor() {
        if (!this.contiEditor) return;
        const {overlay,cleanup,restoreFocus} = this.contiEditor;
        cleanup?.(); overlay.remove(); this.contiEditor = null;
        if (restoreFocus?.isConnected) restoreFocus.focus();
    }

    openContiEditor(items, existing = null) {
        this.closeContiEditor();
        const restoreFocus = document.activeElement;
        this.closeAutocomplete();
        const overlay = document.createElement('div'); overlay.className = 'yuiko-conti-overlay';
        const form = document.createElement('form'); form.className = 'yuiko-conti-dialog'; form.setAttribute('role','dialog'); form.setAttribute('aria-modal','true'); form.setAttribute('aria-label',existing ? '콘티 수정' : '콘티 저장');
        const title = document.createElement('h2'); title.textContent = existing ? '🎬 콘티 수정' : '🎬 새 콘티'; form.append(title);
        const field = (labelText,value,placeholder,max) => {
            const label = document.createElement('label'); label.textContent = labelText;
            const input = document.createElement('input'); input.value = value; input.placeholder = placeholder; input.maxLength = max; label.append(input); form.append(label); return input;
        };
        const name = field('콘티 이름',existing?.name || '', '예: 극찬 세트',40);
        const alias = field('호출어',existing?.alias || '', '예: 극찬 → .극찬으로 검색',30);
        const hint = document.createElement('div'); hint.className = 'yuiko-conti-meta'; hint.textContent = '드래그로 순서 변경 · ×로 삭제 · 같은 콘도 여러 번 담을 수 있어요.'; form.append(hint);
        const stripHost = document.createElement('div'); form.append(stripHost);
        let draft = items.map(item => this.slimItem(item)), strip;
        const redraw = () => {
            const scrollLeft = strip?.scrollLeft || 0;
            strip?.cleanupDrag?.(); strip = this.createContiStrip(draft, next => { draft = next; redraw(); });
            stripHost.replaceChildren(strip); strip.scrollLeft = scrollLeft;
        };
        redraw();
        const search = field('콘 추가','', '이름이나 초성으로 검색',40);
        const results = document.createElement('div'); results.className = 'yuiko-conti-add-results'; form.append(results);
        search.addEventListener('input', () => {
            results.replaceChildren(); if (!search.value.trim()) return;
            [...this.knownItems.values()].filter(item => this.matchesAutocomplete(item.name, search.value.trim())).slice(0,20).forEach(item => {
                results.append(this.contiButton(item.name.split(',')[0], () => { if (draft.length < 30) { draft.push(item); redraw(); } }));
            });
        });
        const error = document.createElement('div'); error.className = 'yuiko-conti-error'; error.setAttribute('role','alert'); form.append(error);
        const actions = document.createElement('div'); actions.className = 'yuiko-conti-actions';
        const save = document.createElement('button'); save.type='submit'; save.className='yuiko-conti-action is-primary'; save.textContent='콘티 저장';
        actions.append(this.contiButton('취소',() => this.closeContiEditor()),save); form.append(actions);
        form.addEventListener('submit',event => { event.preventDefault(); try { this.saveConti({id:existing?.id, name:name.value,alias:alias.value,items:draft}); this.closeContiEditor(); BdApi.UI.showToast('콘티를 저장했습니다.',{type:'success'}); } catch (failure) { error.textContent = failure.message; } });
        overlay.addEventListener('keydown',event => {
            if (event.key === 'Escape') { event.preventDefault(); this.closeContiEditor(); }
            if (event.key === 'Tab') {
                const fields = [...form.querySelectorAll('input,button,[tabindex="0"]')].filter(node => !node.disabled);
                const first=fields[0],last=fields.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });
        overlay.append(form); document.body.append(overlay);
        this.contiEditor = {overlay,cleanup:() => strip?.cleanupDrag?.(),restoreFocus}; name.focus();
    }

    renderContis(filter = '') {
        this.grid.replaceChildren();
        const matches = this.contis.filter(conti => this.matchesAutocomplete(`${conti.name},${conti.alias}`,filter.trim()));
        if (!matches.length) { const empty = document.createElement('div'); empty.className='yuiko-conti-empty'; empty.textContent=this.contis.length ? '검색 결과가 없습니다.' : '나만의 반응을 콘티로 만들어 보세요.\n입력창에서 Tab으로 콘을 2개 이상 고른 뒤 「콘티 저장」을 누르면 됩니다.'; this.grid.append(empty); }
        matches.forEach(conti => {
            const card=document.createElement('div'); card.className='yuiko-conti-card';
            const heading=document.createElement('div'); heading.className='yuiko-conti-heading';
            const name=document.createElement('strong'); name.textContent=conti.name;
            const meta=document.createElement('span'); meta.className='yuiko-conti-meta'; meta.textContent=`.${conti.alias} · 콘 ${conti.items.length}개`; heading.append(name,meta);
            const actions=document.createElement('div'); actions.className='yuiko-conti-actions';
            const remove=this.contiButton('삭제',() => {
                if (remove.dataset.confirm !== 'yes') { remove.dataset.confirm='yes'; remove.textContent='삭제 확인'; return; }
                try { this.deleteConti(conti.id); }
                catch (error) { BdApi.UI.showToast(`콘티를 삭제하지 못했습니다: ${error.message}`,{type:'error'}); }
            });
            actions.append(this.contiButton('수정',() => this.openContiEditor(conti.items,conti)),remove);
            card.append(heading,this.createContiStrip(conti.items),actions); this.grid.append(card);
        });
        this.clearStatusError(); this.status.textContent='입력창에서 .호출어로 검색 · Enter/클릭 전송 · Tab으로 추가';
    }

    getDraftItems(context) {
        const prefix = context.key.slice(0,-(context.query.length+1));
        if (!prefix) return [];
        const available = [...this.knownItems.values(),...this.contis.flatMap(conti => conti.items)];
        const items = prefix.slice(1).split('.').map(word => available.find(item => item.name.split(',').some(alias => alias.trim() === word)));
        return items.every(Boolean) ? items : null;
    }

    renderDraftTray(context) {
        if (!this.autocomplete) return;
        const items = this.getDraftItems(context) || [];
        const key = JSON.stringify(items.map(item => [item.url,item.name]));
        if (this.autocompleteTrayKey === key) return;
        const scrollLeft = this.autocomplete.querySelector('.yuiko-draft-tray .yuiko-conti-strip')?.scrollLeft || 0;
        this.autocompleteTrayCleanup?.(); this.autocompleteTrayCleanup = null;
        this.autocomplete.querySelector('.yuiko-draft-tray')?.remove(); this.autocompleteTrayKey = key;
        if (!items.length) return;
        const tray = document.createElement('div'); tray.className='yuiko-draft-tray';
        const heading=document.createElement('div'); heading.className='yuiko-conti-heading';
        const title=document.createElement('strong'); title.textContent=`보낼 콘 ${items.length}개`; heading.append(title);
        if (items.length >= 2) heading.append(this.contiButton('🎬 콘티 저장',() => this.openContiEditor(items),true));
        const strip=this.createContiStrip(items,next => {
            const current=this.getAutocompleteContext();
            if (!current || current.composer !== context.composer || JSON.stringify((this.getDraftItems(current) || []).map(item => [item.url,item.name])) !== key) return;
            const command=next.map(item => `.${item.name.split(',')[0].trim()}`).join('')+`.${current.query}`;
            const range=current.range.cloneRange(); range.selectNodeContents(current.composer); range.setEnd(current.range.endContainer,current.range.endOffset);
            this.replaceAutocomplete(current,range,command,command,false);
        });
        tray.addEventListener('mousedown',event => event.preventDefault());
        tray.append(heading,strip); this.autocomplete.prepend(tray); strip.scrollLeft=scrollLeft; this.autocompleteTrayCleanup=strip.cleanupDrag;
    }

    bindAutocomplete() {
        this.unbindAutocomplete?.();
        const refresh = () => this.refreshAutocomplete();
        this.autocompleteComposing = false;
        this.autocompleteEnterHeld = null;
        this.autocompleteTabHeld = null;
        this.autocompleteDismissed = null;
        this.syntheticSendEvents = new WeakSet();
        const input = () => { this.autocompleteDismissed = null; refresh(); };
        const close = () => this.closeAutocomplete();
        const compositionStart = () => { this.autocompleteComposing = true; };
        const compositionEnd = () => { this.autocompleteComposing = false; input(); };
        const scroll = event => { if (!this.autocompleteEdit && !this.autocomplete?.contains(event.target)) close(); };
        const outside = event => { if (!this.autocomplete?.contains(event.target)) close(); };
        const keyup = event => {
            if (event.key === 'Enter' && !this.syntheticSendEvents.has(event)) this.autocompleteEnterHeld = null;
            if (event.key === 'Tab') this.autocompleteTabHeld = null;
        };
        const blur = () => { this.autocompleteEnterHeld = this.autocompleteTabHeld = null; close(); };
        const keydown = event => {
            // Our send event must reach Discord, even if Slate reopened the suggestions.
            if (this.syntheticSendEvents.has(event)) { close(); return; }
            if (event.key === 'Enter' && this.autocompleteEnterHeld?.contains(event.target)) {
                event.preventDefault(); event.stopImmediatePropagation(); return;
            }
            if (event.key === 'Tab' && this.autocompleteTabHeld?.contains(event.target)) {
                event.preventDefault(); event.stopImmediatePropagation(); return;
            }
            if (!this.autocomplete || !this.autocompleteContext?.composer.contains(event.target) || this.autocompleteComposing || event.isComposing || event.keyCode === 229) return;
            if (!this.autocompleteItems.length && event.key !== 'Escape') return;
            if (!['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape'].includes(event.key) || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
            event.preventDefault(); event.stopImmediatePropagation();
            if (event.key === 'Escape') { this.autocompleteDismissed = this.autocompleteContext?.key; close(); return; }
            if (event.key === 'Enter' || event.key === 'Tab') {
                if (event.repeat) return;
                if (event.key === 'Enter') this.autocompleteEnterHeld = this.autocompleteContext?.composer;
                if (event.key === 'Tab') this.autocompleteTabHeld = this.autocompleteContext?.composer;
                return this.acceptAutocomplete(event.key === 'Tab');
            }
            const count = this.autocompleteItems.length;
            this.autocompleteIndex = (this.autocompleteIndex + (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
            this.highlightAutocomplete();
        };
        const listeners = [[document,'input',input], [document,'selectionchange',refresh], [document,'compositionstart',compositionStart], [document,'compositionupdate',input], [document,'compositionend',compositionEnd], [document,'keydown',keydown], [document,'keyup',keyup], [document,'mousedown',outside], [document,'scroll',scroll], [window,'resize',close], [window,'blur',blur]];
        for (const [target, type, handler] of listeners) target.addEventListener(type, handler, true);
        this.unbindAutocomplete = () => { this.autocompleteEnterHeld = this.autocompleteTabHeld = null; for (const [target, type, handler] of listeners) target.removeEventListener(type, handler, true); };
    }

    getAutocompleteContext() {
        const selection = window.getSelection();
        if (!selection?.rangeCount || !selection.isCollapsed) return null;
        const caret = selection.getRangeAt(0);
        const element = caret.endContainer.nodeType === 1 ? caret.endContainer : caret.endContainer.parentElement;
        const composer = element?.closest('[contenteditable="true"]');
        if (!composer || composer !== document.activeElement || composer.closest('.yuiko-panel, [role="search"], [class*="search"]')) return null;
        if (!composer.hasAttribute('data-slate-editor') && !/message|메시지/i.test(composer.getAttribute('aria-label') || composer.getAttribute('data-placeholder') || '')) return null;
        const after = caret.cloneRange(); after.selectNodeContents(composer); after.setStart(caret.endContainer,caret.endOffset);
        if (after.toString()) return null;
        const before = caret.cloneRange(); before.selectNodeContents(composer); before.setEnd(caret.endContainer, caret.endOffset);
        const text = before.toString();
        if (!text.startsWith(this.commandPrefix)) return null;
        const match = /(?:^|\s)\.[^\s]*$/u.exec(text);
        // Adjacent sticker commands also allow completing the last dot token.
        const start = text.lastIndexOf(this.commandPrefix);
        if (start < 0 || !match) return null;
        const query = text.slice(start + 1);
        if (/\s/.test(query)) return null;
        const range = caret.cloneRange();
        const walker = document.createTreeWalker(composer, 4);
        let offset = 0, node;
        while ((node = walker.nextNode())) {
            if (offset + node.textContent.length > start) { range.setStart(node, start - offset); break; }
            offset += node.textContent.length;
        }
        if (!node) return null;
        return {composer, range, query, key:text};
    }

    closeAutocomplete() {
        this.autocompleteTrayCleanup?.(); this.autocompleteTrayCleanup = null; this.autocompleteTrayKey = null;
        clearTimeout(this.autocompleteEditTimer); this.autocompleteEditTimer = null;
        this.autocompleteEdit = null;
        this.autocomplete?.remove(); this.autocomplete = null;
        this.autocompleteContext = null; this.autocompleteItems = [];
    }

    matchesAutocomplete(name, query) {
        const initials = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
        const needle = [...query.normalize('NFC').toLowerCase()];
        return name.split(',').some(alias => {
            const letters = [...alias.trim().normalize('NFC').toLowerCase()];
            return letters.some((_, start) => needle.every((char, index) => {
                const candidate = letters[start + index];
                if (!candidate) return false;
                if (candidate === char) return true;
                const code = candidate.charCodeAt(0) - 0xAC00;
                if (code < 0 || code >= 11172) return false;
                const initialIndex = initials.indexOf(char);
                if (initialIndex >= 0) return Math.floor(code / 588) === initialIndex;
                // The last syllable may still be receiving its final consonant in the IME.
                const typed = char.charCodeAt(0) - 0xAC00;
                return index === needle.length - 1 && typed >= 0 && typed < 11172 && typed % 28 === 0 && Math.floor(code / 28) === Math.floor(typed / 28);
            }));
        });
    }

    refreshAutocomplete() {
        if (!this.running || this.contiEditor) return;
        const context = this.getAutocompleteContext();
        if (this.autocompleteEdit) {
            const edit = this.autocompleteEdit;
            if (!edit.composer.isConnected || document.activeElement !== edit.composer) return this.closeAutocomplete();
            if (context?.composer !== edit.composer || context.key !== edit.expectedKey) return;
            clearTimeout(this.autocompleteEditTimer); this.autocompleteEditTimer = null;
            this.autocompleteEdit = null;
            if (edit.send) {
                this.autocompleteDismissed = context.key;
                this.closeAutocomplete();
                if (edit.items?.length) this.addRecentItems(edit.items);
                this.sendMessage(edit.composer, context.key);
                return;
            }
        }
        if (!context || context.key === this.autocompleteDismissed) return this.closeAutocomplete();
        const query = context.query.toLowerCase();
        const items = [...this.knownItems.values()].filter(item => this.enabledGroupIds?.includes(item.groupId) && this.matchesAutocomplete(item.name, query));
        for (const conti of this.contis) {
            if (this.matchesAutocomplete(`${conti.alias},${conti.name}`,query)) items.push({contiId:conti.id,url:`conti:${conti.id}`,name:conti.alias,groupName:`🎬 ${conti.name} · 콘 ${conti.items.length}개`,items:conti.items});
        }
        const rank = item => {
            const aliases = item.name.toLowerCase().split(',').map(alias => alias.trim());
            return aliases.includes(query) ? 0 : aliases.some(alias => alias.startsWith(query)) ? 1 : 2;
        };
        items.sort((a,b) => rank(a) - rank(b));
        if (!items.length && !this.getDraftItems(context)?.length) return this.closeAutocomplete();
        const visibleItems = items.slice(0, 100);
        const sameComposer = this.autocomplete && this.autocompleteContext?.composer === context.composer;
        const sameResults = sameComposer && this.autocompleteTotal === items.length && visibleItems.length === this.autocompleteItems.length && visibleItems.every((item, index) => {
            const previous = this.autocompleteItems[index];
            return item.url === previous.url && item.name === previous.name && item.groupName === previous.groupName;
        });
        if (sameResults) { this.autocompleteContext = context; this.autocompleteItems = visibleItems; this.renderDraftTray(context); return; }
        const preserve = sameComposer && this.autocompleteContext.query === context.query;
        const scrollTop = preserve ? this.autocomplete.scrollTop : 0;
        const selectedUrl = preserve ? this.autocompleteItems[this.autocompleteIndex]?.url : null;
        this.closeAutocomplete();
        this.autocompleteContext = context; this.autocompleteItems = visibleItems; this.autocompleteTotal = items.length;
        this.autocompleteIndex = Math.max(0, visibleItems.findIndex(item => item.url === selectedUrl));
        const panel = document.createElement('div'); panel.className = 'yuiko-autocomplete'; panel.setAttribute('role','listbox'); panel.setAttribute('aria-label','Yuiko 호출어');
        panel.addEventListener('wheel', event => event.stopPropagation(), {passive:true});
        panel.style.cssText = 'position:fixed;z-index:1001;box-sizing:border-box;background:var(--background-secondary,#232428);color:var(--text-normal,#eee);border:1px solid var(--background-modifier-accent,#41434a);border-radius:8px;box-shadow:0 8px 24px #0006;padding:8px;overflow-y:auto;';
        panel.style.overscrollBehavior = 'contain';
        const rect = context.composer.getBoundingClientRect();
        panel.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - 248))}px`;
        panel.style.width = `${Math.max(0, Math.min(Math.max(240, rect.width), innerWidth - 16))}px`;
        panel.style.bottom = `${Math.max(8, innerHeight - rect.top + 8)}px`;
        panel.style.maxHeight = `${Math.max(0, Math.min(360, rect.top - 16))}px`;
        const heading = document.createElement('div'); heading.textContent = `Yuiko 호출어 · ${items.length}개${items.length > 100 ? ' (상위 100개)' : ''} · ↑↓ 이동 · Tab 연속 선택 · Enter/클릭 전송`; heading.style.cssText = 'padding:6px 8px;font-size:12px;color:var(--text-muted,#aaa)'; panel.append(heading);
        this.autocompleteItems.forEach((item, index) => {
            const row = document.createElement('div'); row.setAttribute('role','option');
            row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:8px;border-radius:4px;cursor:pointer;';
            const image = document.createElement(item.contiId ? 'span' : 'img');
            if (item.contiId) { image.className='yuiko-conti-mini'; item.items.slice(0,3).forEach(entry => { const thumb=document.createElement('img'); thumb.src=entry.url; thumb.alt=''; image.append(thumb); }); }
            else { image.src = item.url; image.alt = ''; image.loading = 'lazy'; image.style.cssText = 'width:40px;height:40px;object-fit:contain;flex-shrink:0'; }
            const label = document.createElement('div'); label.style.cssText = 'min-width:0;flex:1;overflow-wrap:anywhere';
            const name = document.createElement('strong'); name.textContent = `.${item.name.split(',')[0].trim()}`;
            const aliases = document.createElement('div'); aliases.textContent = item.name; aliases.style.cssText = 'font-size:12px;color:var(--text-muted,#aaa)'; label.append(name,aliases);
            const group = document.createElement('span'); group.textContent = item.groupName || ''; group.style.cssText = 'font-size:12px;color:var(--text-muted,#aaa)';
            row.append(image,label,group);
            row.addEventListener('mousedown', event => event.preventDefault());
            row.addEventListener('mousemove', () => { if (this.autocompleteIndex !== index) { this.autocompleteIndex = index; this.highlightAutocomplete(false); } });
            row.addEventListener('click', () => { this.autocompleteIndex = index; this.acceptAutocomplete(); });
            panel.append(row);
        });
        document.body.append(panel); this.autocomplete = panel; this.renderDraftTray(context); this.highlightAutocomplete(false);
        panel.scrollTop = scrollTop;
    }

    highlightAutocomplete(scroll = true) {
        this.autocomplete?.querySelectorAll('[role="option"]').forEach((row,index) => {
            const selected = index === this.autocompleteIndex;
            row.setAttribute('aria-selected', String(selected)); row.style.background = selected ? 'var(--background-modifier-selected,#404249)' : '';
            if (selected && scroll) row.scrollIntoView?.({block:'nearest'});
        });
    }

    acceptAutocomplete(keepSearch = false) {
        if (this.autocompleteComposing || this.autocompleteEdit) return;
        const context = this.getAutocompleteContext();
        const item = this.autocompleteItems?.[this.autocompleteIndex];
        if (!context || context.composer !== this.autocompleteContext?.composer || context.key !== this.autocompleteContext?.key || !item) return this.closeAutocomplete();
        const selectedItems = this.contiItems(item);
        if (!selectedItems.length) return this.closeAutocomplete();
        const command = selectedItems.map(entry => `.${entry.name.split(',')[0].trim()}`).join('') + (keepSearch ? `.${context.query}` : '');
        this.replaceAutocomplete(context,context.range,command,context.key.slice(0,-(context.query.length+1))+command,!keepSearch,[...(this.getDraftItems(context) || []),...selectedItems]);
    }

    replaceAutocomplete(context, range, command, expectedKey, send, items = []) {
        if (this.autocompleteEdit) return;
        this.autocompleteEdit = {composer:context.composer, expectedKey, send, items};
        this.autocompleteEditTimer = setTimeout(() => {
            this.closeAutocomplete();
            BdApi.UI.showToast('호출어 입력을 확인하지 못해 전송을 취소했습니다.', {type:'error'});
        }, 500);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        // Let Slate update its own document. Do not additionally mutate the DOM
        // with execCommand: React can revert that DOM-only edit before sending.
        const input = new InputEvent('beforeinput', {bubbles:true,cancelable:true,inputType:'insertText',data:command});
        // Slate uses target ranges to synchronize its model selection. A synthetic
        // InputEvent otherwise returns [], leaving its old caret in use.
        const targetRange = new window.StaticRange({
            startContainer:range.startContainer, startOffset:range.startOffset,
            endContainer:range.endContainer, endOffset:range.endOffset
        });
        Object.defineProperty(input, 'getTargetRanges', {value:() => [targetRange]});
        context.composer.dispatchEvent(input);
        this.autocompleteDismissed = null;
        this.refreshAutocomplete();
    }

    getVersion() {
        try { return String(BdApi.Plugins.get(this.pluginName)?.version || 'unknown'); } catch { return 'unknown'; }
    }

    /**
     * 다음 정시(00분 00초)에 업데이트 확인을 예약하고, 실행 후 다시 그 다음 정시로 예약
     */
    scheduleHourlyUpdateCheck() {
        if (!this.running || this.updated) return;
        if (this.updateTimer) clearTimeout(this.updateTimer);
        const sessionId = this.sessionId;
        const now = new Date();
        const next = new Date(now); next.setHours(now.getHours()+1, 0, 0, 0);
        // 타이머가 정시 직전에 깨어난 경우(1초 미만 남음) 같은 정시에 두 번 확인하지 않도록 한 시간 뒤로
        if (next-now < 1000) next.setHours(next.getHours()+1);
        this.updateTimer = setTimeout(async () => {
            if (!this.isCurrentSession(sessionId)) return;
            this.updateTimer = null;
            await this.checkPluginUpdate();
            // 플러그인이 꺼졌거나 업데이트로 파일이 교체됐으면 재예약하지 않음 (BetterDiscord가 새 버전을 다시 로드함)
            if (this.isCurrentSession(sessionId) && !this.updated) this.scheduleHourlyUpdateCheck();
        }, next-now);
    }

    /**
     * 'a'가 'b'보다 높은 버전인지 (x.y.z 숫자 비교)
     */
    isNewerVersion(a, b) {
        const pa = String(a).split('.').map(n => parseInt(n, 10) || 0), pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) { const x = pa[i] || 0, y = pb[i] || 0; if (x !== y) return x > y; }
        return false;
    }

    /**
     * GitHub의 플러그인 파일을 받아 @version이 현재보다 높으면 파일을 덮어씀.
     * (같거나 낮으면 무시 → 로컬에서 먼저 버전을 올려도 GitHub 구버전에 덮어써지지 않음)
     * BetterDiscord가 plugins 폴더 변경을 감지해 자동으로 다시 로드함.
     */
    /** Git smart HTTP v0의 pkt-line에서 main의 커밋만 읽는다. 길이는 문자 수가 아닌 바이트 수. */
    readUpdateCommit(advertisement) {
        const bytes = new TextEncoder().encode(advertisement);
        const decoder = new TextDecoder();
        let offset = 0, first = true, commit = null;
        while (offset < bytes.length) {
            const header = decoder.decode(bytes.subarray(offset, offset + 4));
            if (!/^[0-9a-f]{4}$/i.test(header)) throw new Error('Git 참조 응답 길이 오류');
            const length = parseInt(header, 16);
            if (length === 0) { offset += 4; continue; }
            if (length < 4 || length > 65520 || offset + length > bytes.length) throw new Error('Git 참조 응답이 잘렸거나 올바르지 않음');
            const line = decoder.decode(bytes.subarray(offset + 4, offset + length));
            offset += length;
            if (first) {
                if (line !== '# service=git-upload-pack\n') throw new Error('Git 참조 응답 형식 오류');
                first = false;
                continue;
            }
            const match = line.split('\0')[0].match(/^([0-9a-f]{40}) refs\/heads\/main\n?$/);
            if (match) {
                if (commit && commit !== match[1]) throw new Error('Git main 참조가 중복됨');
                commit = match[1];
            }
        }
        if (!commit || /^0+$/.test(commit)) throw new Error('GitHub에서 main 커밋을 확인하지 못함');
        return commit;
    }

    /** 최신 참조 확인이 실패하면 오래된 main 캐시로 최신 여부를 판단하지 않는다. */
    async fetchPluginSource() {
        const options = {cache:'no-store', headers:{'Cache-Control':'no-cache', Pragma:'no-cache'}};
        const refs = await BdApi.Net.fetch(this.updateRefsURL, options);
        if (!refs.ok) throw new Error(`GitHub 최신 커밋 확인 실패: HTTP ${refs.status}`);
        const commit = this.readUpdateCommit(await refs.text());
        const rawURL = new URL(this.updateURL);
        const parts = rawURL.pathname.split('/');
        parts[3] = commit;
        rawURL.pathname = parts.join('/'); rawURL.search = '';
        const fetchSource = async (url, init) => {
            const response = await BdApi.Net.fetch(url, init);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const source = await response.text();
            if (!source.match(/^\s*\*\s*@version\s+(\S+)/m) || !source.includes('module.exports')) throw new Error('플러그인 파일 형식이 아님');
            return source;
        };
        try {
            return await fetchSource(rawURL.href, options);
        } catch (error) {
            if (!this.updateAPIURL) throw error;
            console.warn('[YuikoStickers] 커밋 파일 다운로드 실패, 같은 커밋의 API 주소로 재시도:', error.message);
            const apiURL = new URL(this.updateAPIURL); apiURL.searchParams.set('ref', commit);
            return await fetchSource(apiURL.href, {cache:'no-store', headers:{...options.headers, Accept:'application/vnd.github.raw+json'}});
        }
    }

    async checkPluginUpdate(notifyResult = false) {
        if ((!this.updateURL && !this.updateAPIURL) || this.updateInFlight || !this.running || this.updated) return;
        this.updateInFlight = true;
        const sessionId = this.sessionId;
        this.lastPluginUpdateCheck = Date.now();
        try {
            const source = await this.fetchPluginSource();
            if (!this.isCurrentSession(sessionId)) return;
            const remoteVersion = source.match(/^\s*\*\s*@version\s+(\S+)/m)?.[1];
            if (!remoteVersion || !source.includes('module.exports')) throw new Error('플러그인 파일 형식이 아님');
            const fs = require('fs'), path = require('path');
            const file = path.join(BdApi.Plugins.folder, `${this.pluginName}.plugin.js`);
            // 로드 시점의 메타데이터 대신 실제 설치 파일 버전과 비교한다.
            const localSource = fs.readFileSync(file, 'utf8');
            const localVersion = localSource.match(/^\s*\*\s*@version\s+(\S+)/m)?.[1] || 'unknown';
            if (localVersion === 'unknown') throw new Error('현재 버전을 알 수 없어 업데이트를 건너뜀');
            if (!this.isNewerVersion(remoteVersion, localVersion)) {
                console.info(`[YuikoStickers] 업데이트 확인: 설치 ${localVersion}, GitHub ${remoteVersion} (업데이트 없음)`);
                if (notifyResult && this.running) BdApi.UI.showToast(`YuikoStickers ${localVersion}: 새로운 업데이트가 없습니다.`, {type:'info'});
                return;
            }
            if (!this.running) return;
            if (localSource === source) return;
            fs.writeFileSync(file, source, 'utf8');
            BdApi.UI.showToast(`YuikoStickers ${localVersion} → ${remoteVersion} 업데이트됨`, {type:'success'});
            this.updated = true;
            if (this.updateTimer) { clearTimeout(this.updateTimer); this.updateTimer = null; }
        } catch (error) {
            console.warn('[YuikoStickers] 업데이트 확인 실패:', error.message);
            if (this.isCurrentSession(sessionId)) BdApi.UI.showToast(`YuikoStickers 업데이트 확인 실패: ${error.message}`, {type:'error'});
        } finally {
            if (this.sessionId === sessionId) this.updateInFlight = false;
        }
    }

    fetchWithVersion(url) {
        const target = new URL(url);
        target.searchParams.set('v', this.version);
        return BdApi.Net.fetch(target.href, {headers:{'X-Plugin-Version':this.version}});
    }

    async loadGroups(force = false) {
        const sessionId = this.sessionId;
        const token = ++this.groupsLoadToken;
        const isCurrent = () => this.isCurrentSession(sessionId) && token === this.groupsLoadToken;
        try {
            const response = await this.fetchWithVersion(this.apiBase+'groups');
            if (!isCurrent()) return false;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const groups = await response.json();
            if (!isCurrent()) return false;
            // 오류 객체를 빈 그룹 목록으로 취급하면 저장된 즐겨찾기가 삭제될 수 있다.
            if (!Array.isArray(groups) || groups.some(group => !group || Array.isArray(group) || !Number.isFinite(Number(group.id)))) throw new Error('올바르지 않은 그룹 목록 응답');
            this.groups = groups.map(group => ({id:Number(group.id), name:String(group.name || `그룹 ${group.id}`), description:String(group.description || ''), count:Number(group.count || 0)}));
            this.applyGroupOrder();
            const available = new Set(this.groups.map(group => group.id));
            for (const [url, item] of this.knownItems) if (!available.has(item.groupId)) this.knownItems.delete(url);
            if (!Array.isArray(this.enabledGroupIds)) this.enabledGroupIds = this.groups.map(group => group.id);
            this.enabledGroupIds = this.enabledGroupIds.filter(id => available.has(id));
            if (this.selectedGroupId !== null && !available.has(this.selectedGroupId)) this.selectedGroupId = null;
            this.saveGroupSettings();
            await this.loadGroupItems();
            if (!isCurrent()) return false;
            await this.loadGroupThumbsFromServer();
            if (!isCurrent()) return false;
            if (this.panel) {
                this.renderGroupControls();
                this.render();
            }
            this.saveCache();
            return true;
        } catch (error) {
            if (!isCurrent()) return false;
            console.warn('[YuikoStickers] 그룹 로딩 실패:', error);
            this.setStatusError('그룹을 불러오지 못했습니다. 클릭하면 다시 시도합니다.');
            return false;
        }
    }

    async loadGroupItems() {
        const sessionId = this.sessionId;
        const token = ++this.loadToken;
        const isCurrent = () => this.isCurrentSession(sessionId) && token === this.loadToken;
        const ids = this.selectedGroupId === null ? this.sortIdsByGroupOrder(this.enabledGroupIds || []) : [this.selectedGroupId];
        const groupMap = new Map(this.groups.map(group => [group.id, group]));
        let responses;
        try {
            responses = await Promise.all(ids.map(async id => {
                const response = await this.fetchWithVersion(this.apiBase+'group/'+id);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const items = await response.json();
                if (!Array.isArray(items) || items.some(item => !item || typeof item !== 'object' || Array.isArray(item))) throw new Error('올바르지 않은 이모지 목록 응답');
                return items.map(item => ({...item, name:String(item.word || item.name || ''), groupId:id, groupName:groupMap.get(id)?.name || `그룹 ${id}`, url:item.url || `https://snow.modaweb.kr/project/emoji/${String(item.id).padStart(2, '0')}.${item.ext}`}));
            }));
        } catch (error) {
            if (!isCurrent()) return false;
            throw error;
        }
        if (!isCurrent()) return false; // 이전 그룹/이전 실행의 결과는 버린다.
        for (const items of responses) if (items.length) this.groupThumbs[items[0].groupId] = items[0].url;
        this.saveGroupThumbs();
        // 빈 배열로 온 그룹은 서버 오류일 수 있으니 knownItems 정리 대상에서 제외 (즐겨찾기 오삭제 방지)
        this.applyItems(responses.flat(), ids.filter((id, index) => responses[index].length > 0));
        return true;
    }

    // UI 이벤트에서 시작한 요청의 실패도 처리해서 처리되지 않은 Promise를 남기지 않는다.
    async refreshSelectedGroup(search) {
        const sessionId = this.sessionId;
        const request = this.loadGroupItems();
        const token = this.loadToken;
        try {
            if (await request && this.isCurrentSession(sessionId)) this.render(search.value);
        } catch (error) {
            if (!this.isCurrentSession(sessionId) || token !== this.loadToken) return;
            console.warn('[YuikoStickers] 그룹 이모지 로딩 실패:', error);
            if (!this.contiView) this.setStatusError(`그룹을 불러오지 못했습니다: ${error.message || '알 수 없는 오류'} · 클릭하여 재시도`);
        }
    }

    selectPanelTab(groupId) {
        // Changing to a local tab must also invalidate a pending group request.
        this.loadToken++;
        const leavingConti = this.contiView;
        this.contiView = groupId === 'conti';
        this.hidePreview(); this.hideGroupPreview(); this.cancelLongPress();
        this.panel.querySelector('.yuiko-manage')?.classList.remove('is-open');
        if (this.contiView) {
            this.searchInput.value = ''; this.renderGroupControls(); this.render(); return;
        }
        const id = groupId === 'all' ? null : Number(groupId);
        if (id !== null && (!Number.isSafeInteger(id) || !this.groups.some(group => group.id === id))) return;
        this.selectedGroupId = id;
        if (leavingConti) this.searchInput.value = '';
        this.saveGroupSettings(); this.renderGroupControls();
        const ids = id === null ? this.sortIdsByGroupOrder(this.enabledGroupIds || []) : [id];
        const cached = ids.map(group => [...this.knownItems.values()].filter(item => item.groupId === group));
        const complete = ids.every((group,index) => {
            const expected = this.groups.find(entry => entry.id === group)?.count;
            return Number.isFinite(expected) && cached[index].length === expected;
        });
        if (complete) {
            // Browsing an already loaded group is local. Opening the panel and
            // the existing latest check still refresh server data separately.
            this.items = cached.flat(); this.itemByUrl = new Map(this.items.map(item => [item.url,item]));
            this.render(this.searchInput.value);
            return;
        }
        this.grid.classList.remove('is-conti'); this.grid.replaceChildren();
        this.searchInput.placeholder = '이모지 검색...';
        this.clearStatusError(); this.status.textContent = '그룹을 불러오는 중...';
        this.refreshSelectedGroup(this.searchInput);
    }

    /**
     * 대표 이미지가 아직 없는 그룹만 서버에서 첫 번째 이모지를 받아옴 (꺼진 그룹도 설정창에 보여주기 위해)
     */
    async loadGroupThumbsFromServer() {
        const sessionId = this.sessionId;
        const missing = this.groups.filter(group => !this.groupThumbs[group.id]);
        if (!missing.length) return;
        await Promise.all(missing.map(async group => {
            try {
                const response = await this.fetchWithVersion(this.apiBase+'group/'+group.id);
                if (!response.ok) return;
                const items = await response.json();
                if (!this.isCurrentSession(sessionId)) return;
                const first = Array.isArray(items) ? items[0] : null;
                if (first) this.groupThumbs[group.id] = first.url || `https://snow.modaweb.kr/project/emoji/${String(first.id).padStart(2, '0')}.${first.ext}`;
            } catch (error) { console.warn('[YuikoStickers] 그룹 대표 이미지 로딩 실패:', group.id, error.message); }
        }));
        if (!this.isCurrentSession(sessionId)) return;
        this.saveGroupThumbs();
        if (this.panel) this.renderGroupControls();
    }
    loadGroupThumbs() {
        const saved = BdApi.Data.load(this.pluginName, 'groupThumbs');
        this.groupThumbs = saved && typeof saved === 'object' && !Array.isArray(saved)
            ? Object.fromEntries(Object.entries(saved).filter(([,url]) => typeof url === 'string'))
            : {};
    }
    saveGroupThumbs() { BdApi.Data.save(this.pluginName, 'groupThumbs', this.groupThumbs); }
    createGroupThumb(group, className) { const url = this.groupThumbs[group.id]; if (!url) return null; const image = document.createElement('img'); image.className = className; image.src = url; image.alt = group.name; image.loading = 'lazy'; return image; }

    /**
     * @param items 화면에 표시할 이모지
     * @param loadedGroupIds 이번에 서버에서 새로 받아온 그룹 id 목록. 이 그룹들에서 사라진 이모지만 knownItems에서 제거
     */
    applyItems(items, loadedGroupIds = null) {
        this.items = items;
        this.itemByUrl = new Map(items.map(item => [item.url, item]));
        if (loadedGroupIds) {
            const loaded = new Set(loadedGroupIds);
            for (const [url, item] of this.knownItems) if (loaded.has(item.groupId) && !this.itemByUrl.has(url)) this.knownItems.delete(url);
        }
        for (const item of items) this.knownItems.set(item.url, item);
        this.pruneStoredUrls();
        if (this.grid) this.render();
        if (this.unbindAutocomplete) this.refreshAutocomplete();
    }

    async checkForUpdates(force = false) {
        const sessionId = this.sessionId;
        const now = Date.now();
        if (!force && now - this.lastCheckAt < this.checkInterval) return;
        this.lastCheckAt = now;
        try {
            const response = await this.fetchWithVersion(this.apiBase+'latest');
            if (!this.isCurrentSession(sessionId)) return;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!this.isCurrentSession(sessionId)) return;
            if (data.datetime !== this.lastDatetime || !this.items.length) {
                if (await this.loadGroups(true) && this.isCurrentSession(sessionId)) { this.lastDatetime = data.datetime; this.saveCache(); }
            }
        } catch (error) {
            if (!this.isCurrentSession(sessionId)) return;
            console.warn('[YuikoStickers] 갱신 확인 실패:', error.message);
            if (!this.items.length) this.setStatusError('서버에 연결하지 못했습니다. 클릭하면 다시 시도합니다.');
        }
    }
    setStatusError(message) { if (!this.status) return; this.status.textContent = message; this.status.classList.add('is-error'); }
    clearStatusError() { this.status?.classList.remove('is-error'); }

    /**
     * 캐시 형식: {datetime, known:[item...], shown:[url...]}
     * known에는 지금까지 본 모든 이모지를 필요한 필드만, shown에는 마지막으로 표시 중이던 이모지 URL만 저장 (중복 저장 방지)
     */
    loadCache() {
        const saved = BdApi.Data.load(this.pluginName, 'cache');
        if (!saved) return;
        this.lastDatetime = saved.datetime ?? null;
        const valid = item => item && typeof item.url === 'string' && typeof item.name === 'string';
        const known = Array.isArray(saved.known) ? saved.known : Array.isArray(saved.items) ? saved.items : [];
        this.knownItems = new Map(known.filter(valid).map(item => [item.url, this.slimItem(item)]));
        // 구버전 캐시(items 배열)도 그대로 읽음
        const shown = Array.isArray(saved.shown) ? saved.shown.map(url => this.knownItems.get(url)).filter(Boolean) : Array.isArray(saved.items) ? saved.items.filter(valid).map(item => this.slimItem(item)) : [];
        this.applyItems(shown);
    }
    slimItem(item) { return {url:item.url, name:String(item.name), groupId:Number(item.groupId ?? 0), groupName:String(item.groupName || '')}; }

    saveCache() { BdApi.Data.save(this.pluginName, 'cache', {datetime:this.lastDatetime, known:[...this.knownItems.values()].map(item => this.slimItem(item)), shown:this.items.map(item => item.url)}); }

    createPanel() {
        if (this.panel) return;
        const panel = document.createElement('div');
        panel.className = 'yuiko-panel';
        panel.style.display = 'none';
        const header = document.createElement('div'); header.className = 'yuiko-header';
        const title = document.createElement('div'); title.className = 'yuiko-title'; title.textContent = 'Yuiko';
        const manage = document.createElement('button'); manage.className = 'yuiko-manage-toggle'; manage.type = 'button'; manage.textContent = '⚙'; manage.title = '그룹 표시 설정';
        const search = document.createElement('input'); search.className = 'yuiko-search'; search.type = 'search'; search.placeholder = '이모지 검색...';
        header.append(title, manage, search);
        const groupbar = document.createElement('div'); groupbar.className = 'yuiko-groupbar';
        const managePanel = document.createElement('div'); managePanel.className = 'yuiko-manage';
        const grid = document.createElement('div'); grid.className = 'yuiko-grid';
        const status = document.createElement('div'); status.className = 'yuiko-status';
        status.addEventListener('click', () => { if (!status.classList.contains('is-error')) return; status.textContent = '다시 불러오는 중...'; status.classList.remove('is-error'); this.loadGroups(true); });
        const body = document.createElement('div'); body.className = 'yuiko-body';
        const main = document.createElement('div'); main.className = 'yuiko-main';
        main.append(managePanel, grid); body.append(groupbar, main);
        const queueStatus = document.createElement('div'); queueStatus.className = 'yuiko-queue-status';
        this.queueStatus = queueStatus;
        panel.append(header, body, status, queueStatus); document.body.appendChild(panel);
        this.panel = panel; this.grid = grid; this.status = status; this.searchInput = search;
        this.renderGroupControls(); this.createPreview(); this.createGroupPreview(); this.bindGroupPreview(managePanel);
        manage.addEventListener('click', event => { event.stopPropagation(); managePanel.classList.toggle('is-open'); this.hideGroupPreview(); this.renderGroupControls(); });
        search.addEventListener('input', () => this.render(search.value));
        groupbar.addEventListener('click', event => {
            if (this.suppressNextClick) return;
            if (event.target.closest('.yuiko-conti-tab')) return this.selectPanelTab('conti');
            const button = event.target.closest('.yuiko-group-button[data-group-id]');
            if (button) this.selectPanelTab(button.dataset.groupId);
        });
        managePanel.addEventListener('change', event => { if (!event.target.matches('input[data-group-id]')) return; const id = Number(event.target.dataset.groupId); if (event.target.checked) { if (!this.enabledGroupIds.includes(id)) this.enabledGroupIds.push(id); } else { this.enabledGroupIds = this.enabledGroupIds.filter(value => value !== id); if (this.selectedGroupId === id) this.selectedGroupId = null; } this.saveGroupSettings(); this.renderGroupControls(); this.refreshSelectedGroup(search); });
        managePanel.addEventListener('click', event => { const move = event.target.closest('.yuiko-move'); if (!move) return; this.moveGroup(Number(move.dataset.groupId), Number(move.dataset.dir)); this.renderGroupControls(); this.render(search.value); });
        const afterGroupMove = (id, targetId, before) => { this.moveGroupTo(id, targetId, before); this.renderGroupControls(); this.render(search.value); };
        this.bindDragReorder(managePanel, '.yuiko-manage-row', {axis:'y', getId:element => Number(element.dataset.groupId), onDrop:afterGroupMove});
        this.bindDragReorder(groupbar, '.yuiko-group-button[data-group-id]:not([data-group-id="all"])', {axis:'y', getId:element => Number(element.dataset.groupId), onDrop:afterGroupMove});
        this.bindDragReorder(grid, '.yuiko-item[data-section="fav"]', {axis:'x', getId:element => element.dataset.url, onDrop:(url, targetUrl, before) => this.moveFavoriteTo(url, targetUrl, before)});
        this.bindGridEvents(grid);
        this.render();
    }

    capturePanelScroll() {
        const positions = [...(this.panel?.querySelectorAll('.yuiko-grid, .yuiko-groupbar, .yuiko-manage') || [])]
            .map(element => ({element, top:element.scrollTop, left:element.scrollLeft}));
        return () => {
            for (const {element, top, left} of positions) {
                element.scrollTop = top;
                element.scrollLeft = left;
            }
        };
    }

    renderGroupControls() {
        if (!this.panel) return;
        const restoreScroll = this.capturePanelScroll();
        const bar = this.panel.querySelector('.yuiko-groupbar');
        const management = this.panel.querySelector('.yuiko-manage');
        bar.replaceChildren();
        const all = document.createElement('div'); all.setAttribute('role', 'button'); all.tabIndex = 0; all.className = 'yuiko-group-button'+(this.selectedGroupId === null ? ' is-active' : ''); all.dataset.groupId = 'all'; all.title = `전체 (${this.enabledGroupIds?.length || 0})`; all.classList.add('has-thumb'); const allIcon = document.createElement('img'); allIcon.src = this.iconURL; allIcon.alt = '전체'; all.appendChild(allIcon); bar.appendChild(all);
        all.classList.toggle('is-active',!this.contiView && this.selectedGroupId === null);
        const contiTab=document.createElement('button'); contiTab.type='button'; contiTab.className='yuiko-conti-tab yuiko-group-button'+(this.contiView ? ' is-active' : ''); contiTab.textContent='🎬'; contiTab.title='내 콘티'; contiTab.setAttribute('aria-label','내 콘티'); bar.append(contiTab);
        for (const group of this.groups.filter(group => this.enabledGroupIds?.includes(group.id))) { const button = document.createElement('div'); button.setAttribute('role', 'button'); button.tabIndex = 0; button.className = 'yuiko-group-button'+(this.selectedGroupId === group.id ? ' is-active' : ''); button.dataset.groupId = group.id; button.title = `${group.name} (${group.count}) · 드래그해서 순서 변경`; button.classList.add('has-thumb'); const thumb = this.createGroupThumb(group, ''); if (thumb) button.appendChild(thumb); else { const letter = document.createElement('span'); letter.className = 'yuiko-group-letter'; letter.textContent = group.name.trim().charAt(0) || '?'; button.appendChild(letter); } bar.appendChild(button); }
        management.replaceChildren();
        if (this.contiView) bar.querySelectorAll('[data-group-id]').forEach(button => button.classList.remove('is-active'));
        this.groups.forEach((group, index) => { const row = document.createElement('div'); row.className = 'yuiko-manage-row'; row.dataset.groupId = group.id; const handle = document.createElement('span'); handle.className = 'yuiko-drag-handle'; handle.textContent = '⠿'; handle.title = '드래그해서 순서 변경'; row.appendChild(handle); const label = document.createElement('label'); const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.dataset.groupId = group.id; checkbox.checked = this.enabledGroupIds?.includes(group.id); label.appendChild(checkbox); const thumb = this.createGroupThumb(group, 'yuiko-manage-thumb'); if (thumb) label.appendChild(thumb); const text = document.createElement('span'); text.textContent = `${group.name} (${group.count})`; label.appendChild(text); const up = document.createElement('button'); up.className = 'yuiko-move'; up.type = 'button'; up.dataset.groupId = group.id; up.dataset.dir = '-1'; up.textContent = '▲'; up.title = '위로'; up.disabled = index === 0; const down = document.createElement('button'); down.className = 'yuiko-move'; down.type = 'button'; down.dataset.groupId = group.id; down.dataset.dir = '1'; down.textContent = '▼'; down.title = '아래로'; down.disabled = index === this.groups.length-1; row.append(label, up, down); management.appendChild(row); });
        restoreScroll();
    }

    createGroupPreview() {
        const popup = document.createElement('div'); popup.className = 'yuiko-group-preview';
        const title = document.createElement('div'); title.className = 'yuiko-group-preview-title';
        const grid = document.createElement('div'); grid.className = 'yuiko-group-preview-grid';
        popup.append(title, grid); document.body.appendChild(popup); this.groupPreview = popup;
    }
    /**
     * 설정창 행 호버 → 그 그룹의 이모지 몇 개를 팝업으로. 설정창 밖으로 나가거나 드래그를 시작하면 숨김
     */
    bindGroupPreview(managePanel) {
        managePanel.addEventListener('mouseover', event => { if (this.dragActive) return; const row = event.target.closest('.yuiko-manage-row'); if (!row) return this.hideGroupPreview(); const id = Number(row.dataset.groupId); if (id !== this.groupPreviewId) this.showGroupPreview(id, row); });
        managePanel.addEventListener('mouseleave', () => this.hideGroupPreview());
    }
    async showGroupPreview(id, row) {
        const group = this.groups.find(group => group.id === id);
        if (!group || !this.groupPreview) return;
        this.groupPreviewId = id;
        const sessionId = this.sessionId;
        const popup = this.groupPreview;
        const [title, grid] = popup.children;
        title.replaceChildren(); const thumb = this.createGroupThumb(group, ''); if (thumb) title.appendChild(thumb); title.append(`${group.name} (${group.count})`);
        grid.replaceChildren(); const loading = document.createElement('div'); loading.className = 'yuiko-group-preview-empty'; loading.textContent = '불러오는 중...'; grid.appendChild(loading);
        this.groupPreview.classList.add('is-visible'); this.positionGroupPreview(row);
        const items = await this.getGroupPreviewItems(id);
        if (!this.isCurrentSession(sessionId) || this.groupPreview !== popup || this.groupPreviewId !== id || !row.isConnected) return;
        grid.replaceChildren();
        if (!items.length) { const empty = document.createElement('div'); empty.className = 'yuiko-group-preview-empty'; empty.textContent = '이모지를 불러오지 못했습니다.'; grid.appendChild(empty); }
        for (const item of items) { const image = document.createElement('img'); image.src = item.url; image.alt = item.name; grid.appendChild(image); }
        this.positionGroupPreview(row);
    }
    positionGroupPreview(row) {
        if (!this.groupPreview || !this.panel || !row.isConnected) return;
        const popup = this.groupPreview, panelRect = this.panel.getBoundingClientRect(), margin = 8;
        const bodyRect = this.panel.querySelector('.yuiko-body').getBoundingClientRect();
        const width = Math.min(280, Math.max(0, innerWidth - margin * 2));
        const top = Math.max(margin, Math.min(bodyRect.top, innerHeight - margin));
        const height = Math.min(480, Math.max(0, Math.min(panelRect.bottom, innerHeight - margin) - top));
        // 행 위치나 이미지 로딩 상태와 무관하게 패널 본문 옆에 고정한다.
        let left = panelRect.left - width - margin;
        if (left < margin) left = panelRect.right + margin;
        popup.style.width = `${width}px`; popup.style.height = `${height}px`;
        popup.style.left = `${Math.min(Math.max(margin, left), Math.max(margin, innerWidth - width - margin))}px`;
        popup.style.top = `${Math.max(margin, top)}px`;
    }
    hideGroupPreview() { this.groupPreviewId = null; this.groupPreview?.classList.remove('is-visible'); }
    /**
     * 미리보기용 이모지: 이미 받아둔 것(knownItems)이 있으면 그걸, 없으면 그 그룹만 한 번 받아와서 세션 캐시
     */
    async getGroupPreviewItems(id) {
        const sessionId = this.sessionId;
        const known = [...this.knownItems.values()].filter(item => item.groupId === id);
        if (known.length) return known.slice(0, this.groupPreviewCount);
        if (this.groupPreviewCache.has(id)) return this.groupPreviewCache.get(id);
        try {
            const response = await this.fetchWithVersion(this.apiBase+'group/'+id);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const raw = await response.json();
            if (!this.isCurrentSession(sessionId)) return [];
            const items = (Array.isArray(raw) ? raw : []).slice(0, this.groupPreviewCount).map(item => ({url:item.url || `https://snow.modaweb.kr/project/emoji/${String(item.id).padStart(2, '0')}.${item.ext}`, name:String(item.word || item.name || '')}));
            this.groupPreviewCache.set(id, items);
            return items;
        } catch (error) { console.warn('[YuikoStickers] 그룹 미리보기 로딩 실패:', id, error.message); return []; }
    }
    createPreview() {
        const preview = document.createElement('div'); preview.className = 'yuiko-preview'; const image = document.createElement('img'); preview.appendChild(image); document.body.appendChild(preview); this.preview = preview; this.previewImage = image;
    }

    bindGridEvents(grid) {
        const findItem = target => { const url = target?.closest?.('.yuiko-item')?.dataset.url; return this.itemByUrl.get(url) || this.knownItems.get(url) || null; };
        grid.addEventListener('pointerdown', event => {
            this.cancelLongPress(); this.suppressEmojiClick = false;
            if (event.button !== 0) return;
            const item = findItem(event.target); if (!item) return;
            this.longPressTimer = setTimeout(() => {
                this.longPressTimer = null;
                if (this.dragActive) return;
                this.suppressEmojiClick = true;
                this.toggleFavorite(item);
            }, 1000);
        });
        const cancelPress = () => this.cancelLongPress();
        document.addEventListener('pointerup', cancelPress, true);
        document.addEventListener('pointercancel', cancelPress, true);
        window.addEventListener('blur', cancelPress);
        grid.addEventListener('pointerleave', cancelPress);
        grid.addEventListener('pointerout', event => { if (findItem(event.target) !== findItem(event.relatedTarget)) cancelPress(); });
        grid.addEventListener('scroll', () => { cancelPress(); this.hidePreview(); }, {passive:true});
        grid.addEventListener('dragstart', event => event.preventDefault());
        this.unbindGridPress = () => {
            document.removeEventListener('pointerup', cancelPress, true);
            document.removeEventListener('pointercancel', cancelPress, true);
            window.removeEventListener('blur', cancelPress);
        };
        grid.addEventListener('click', event => {
            if (this.suppressEmojiClick) { event.preventDefault(); event.stopPropagation(); this.suppressEmojiClick = false; return; }
            if (this.suppressNextClick) return;
            if (event.target.closest('.yuiko-sort')) return this.toggleSort();
            const item = findItem(event.target); if (item) this.useEmoji(item);
        });
        grid.addEventListener('contextmenu', event => {
            const item = findItem(event.target); if (!item) return;
            event.preventDefault(); event.stopPropagation(); this.cancelLongPress();
            if (event.shiftKey) return this.toggleFavorite(item);
            this.queuedItems.push(item); this.updateQueueStatus(true);
        });
        grid.addEventListener('mousemove', event => { if (this.dragActive) return; const item = findItem(event.target); if (item) this.showPreview(item, event); else this.hidePreview(); });
        grid.addEventListener('mouseleave', () => this.hidePreview());
    }

    cancelLongPress() { clearTimeout(this.longPressTimer); this.longPressTimer = null; }
    updateQueueStatus(scrollToEnd = false) {
        if (!this.queueStatus) return;
        const restoreScroll = this.capturePanelScroll();
        const previousScroll = this.queueStatus.querySelector('.yuiko-queue-list')?.scrollLeft || 0;
        this.queueStatus.replaceChildren();
        this.queueStatus.classList.toggle('has-items', this.queuedItems.length > 0);
        this.queueStatus.removeAttribute('title');
        if (!this.queuedItems.length) { restoreScroll(); return; }
        const header = document.createElement('div'); header.className = 'yuiko-queue-header';
        const label = document.createElement('span'); label.textContent = `전송 대기 ${this.queuedItems.length}개 · 이모지 좌클릭으로 함께 전송`;
        const clear = document.createElement('button'); clear.className = 'yuiko-queue-clear'; clear.type = 'button'; clear.textContent = '전체 비우기';
        clear.addEventListener('click', () => { this.queuedItems = []; this.updateQueueStatus(); });
        header.append(label, clear);
        if (this.queuedItems.length >= 2) header.append(this.contiButton('🎬 콘티 저장',() => this.openContiEditor(this.queuedItems)));
        const list = document.createElement('div'); list.className = 'yuiko-queue-list'; list.setAttribute('role', 'list'); list.setAttribute('aria-label', '전송 대기 이모지');
        this.queuedItems.forEach((item, index) => {
            const name = item.name.split(',')[0].trim();
            const card = document.createElement('div'); card.className = 'yuiko-queue-item'; card.setAttribute('role', 'listitem'); card.title = `${index + 1}. ${name}`;
            const image = document.createElement('img'); image.src = item.url; image.alt = name; image.draggable = false;
            const number = document.createElement('span'); number.className = 'yuiko-queue-number'; number.textContent = String(index + 1);
            const remove = document.createElement('button'); remove.className = 'yuiko-queue-remove'; remove.type = 'button'; remove.textContent = '×';
            remove.title = `${index + 1}번 ${name} 선택 취소`; remove.setAttribute('aria-label', remove.title);
            remove.addEventListener('click', () => { this.queuedItems.splice(index, 1); this.updateQueueStatus(); });
            card.append(image, number, remove); list.appendChild(card);
        });
        this.queueStatus.append(header, list);
        list.scrollLeft = scrollToEnd ? list.scrollWidth : previousScroll;
        restoreScroll();
    }

    showPreview(item, event) {
        if (!this.previewImage || !this.preview) return;
        // 같은 이미지 위의 mousemove마다 src를 다시 쓰지 않는다 (GIF 재시작/불필요한 DOM 변경 방지).
        if (this.previewImage.getAttribute('src') !== item.url) this.previewImage.src = item.url;
        this.preview.classList.add('is-visible');
        let left = event.clientX + 18, top = event.clientY + 18;
        const width = this.preview.offsetWidth || 200, height = this.preview.offsetHeight || 220;
        if (left + width > innerWidth - 10) left = event.clientX - width - 18;
        if (top + height > innerHeight - 10) top = event.clientY - height - 18;
        this.preview.style.left = `${Math.max(10,left)}px`; this.preview.style.top = `${Math.max(10,top)}px`;
    }
    hidePreview() { this.preview?.classList.remove('is-visible'); }

    togglePanel(button) {
        this.createPanel();
        if (this.panel.style.display === 'flex') return this.closePanel();
        if (!this.composer?.isConnected) return BdApi.UI.showToast('Discord 메시지 입력창을 찾을 수 없습니다.', {type:'error'});
        this.saveComposerSelection(); this.panel.style.display = 'flex';
        // 정시를 기다리지 않고 패널을 열 때도 확인하되 GitHub 요청은 5분 간격으로 제한한다.
        if (Date.now() - this.lastPluginUpdateCheck >= 5 * 60 * 1000) this.checkPluginUpdate();
        const rect = button.getBoundingClientRect(), panelRect = this.panel.getBoundingClientRect(), margin = 10;
        let left = Math.min(rect.left, innerWidth-panelRect.width-margin), top = rect.top-panelRect.height-8;
        if (top < margin) top = Math.min(rect.bottom+8, innerHeight-panelRect.height-margin);
        this.panel.style.left = `${Math.max(margin,left)}px`; this.panel.style.top = `${Math.max(margin,top)}px`; this.bindOutsideClick(); this.checkForUpdates();
    }
    closePanel() {
        this.cancelLongPress(); this.queuedItems = []; this.updateQueueStatus();
        if (this.panel) {
            this.panel.style.display = 'none';
            this.panel.querySelector('.yuiko-manage')?.classList.remove('is-open');
            if (this.searchInput?.value) { this.searchInput.value = ''; this.render(); }
        }
        this.hidePreview(); this.hideGroupPreview(); this.unbindOutsideClick();
    }
    bindOutsideClick() { if (this.onDocumentMouseDown) return; this.onDocumentMouseDown = event => { if (this.contiEditor || this.panel?.contains(event.target) || this.button?.contains(event.target)) return; this.closePanel(); }; document.addEventListener('mousedown', this.onDocumentMouseDown, true); }
    unbindOutsideClick() { if (!this.onDocumentMouseDown) return; document.removeEventListener('mousedown', this.onDocumentMouseDown, true); this.onDocumentMouseDown = null; }

    render(filter = '') {
        if (!this.grid) return;
        this.grid.classList.toggle('is-conti',this.contiView);
        this.searchInput.placeholder=this.contiView ? '콘티 이름 또는 호출어 검색...' : '이모지 검색...';
        if (this.contiView) { this.hidePreview(); this.renderContis(filter); return; }
        const restoreScroll = this.capturePanelScroll();
        this.cancelLongPress();
        this.hidePreview();
        const fragment = document.createDocumentFragment();
        const query = filter.trim().toLowerCase();
        const items = this.items.filter(item => !query || item.name.toLowerCase().includes(query));
        // 즐겨찾기는 현재 그룹과 관계없이 전부 표시
        const favoriteItems = [...this.favorites].map(url => this.knownItems.get(url)).filter(item => item && (!query || item.name.toLowerCase().includes(query)));
        if (favoriteItems.length) { fragment.appendChild(this.createSection(`즐겨찾기 ${favoriteItems.length}`)); favoriteItems.forEach(item => fragment.appendChild(this.createItem(item, 'fav'))); }
        fragment.appendChild(this.createSection(`${this.selectedGroupId === null ? '선택 그룹' : this.groups.find(group => group.id === this.selectedGroupId)?.name || '그룹'} · 전체 ${items.length}`, true));
        this.sortItems(items).forEach(item => fragment.appendChild(this.createItem(item)));
        this.grid.replaceChildren(fragment);
        this.clearStatusError();
        this.status.textContent = this.selectedGroupId === null && !this.enabledGroupIds?.length ? '표시할 그룹이 없습니다. ⚙에서 그룹을 선택하세요.' : '';
        this.updateQueueStatus();
        restoreScroll();
    }
    createSection(label, withSort = false) {
        const section = document.createElement('div'); section.className = 'yuiko-section';
        const text = document.createElement('span'); text.textContent = label; section.appendChild(text);
        if (withSort) {
            const sort = document.createElement('button'); sort.className = 'yuiko-sort'; sort.type = 'button';
            sort.textContent = this.sortByRecent ? '🕒 최근순' : '기본순';
            section.append(sort);
        }
        return section;
    }
    /**
     * 이모지 칸 (포인터 드래그 정렬을 위해 <button> 대신 <div>)
     */
    createItem(item, section = null) { const button = document.createElement('div'); button.className = 'yuiko-item'+(this.favorites.has(item.url) ? ' is-favorite' : ''); button.setAttribute('role', 'button'); button.tabIndex = 0; button.dataset.url = item.url; if (section) button.dataset.section = section; const image = document.createElement('img'); image.src = item.url; image.alt = item.name; image.loading = 'lazy'; image.draggable = false; button.appendChild(image); return button; }

    useEmoji(item) {
        const composer = this.composer;
        if (!composer?.isConnected) return BdApi.UI.showToast('Discord 메시지 입력창을 찾을 수 없습니다.', {type:'error'});
        const selectedItems = [...this.queuedItems, item];
        const command = selectedItems.map(selected => `${this.commandPrefix}${selected.name.split(',')[0].trim()}`).join('');
        this.closePanel(); composer.focus(); const selection = window.getSelection();
        if (this.savedSelection && composer.contains(this.savedSelection.commonAncestorContainer)) { selection.removeAllRanges(); selection.addRange(this.savedSelection.cloneRange()); } else { const range = document.createRange(); range.selectNodeContents(composer); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
        const allowed = composer.dispatchEvent(new InputEvent('beforeinput', {bubbles:true, cancelable:true, inputType:'insertText', data:command}));
        if (allowed && !document.execCommand('insertText', false, command)) return BdApi.UI.showToast('Discord가 입력을 처리하지 못했습니다.', {type:'error'});
        this.addRecentItems(selectedItems);
        if (!allowed || this.autoSend) this.sendMessage(composer);
    }
    sendMessage(composer, expectedKey = null) {
        if (!this.autoSend || !this.running) return;
        const sessionId = this.sessionId;
        const timer = setTimeout(() => {
            this.pendingSendTimers.delete(timer);
            if (!this.isCurrentSession(sessionId) || !composer?.isConnected) return;
            if (expectedKey !== null) {
                const context = this.getAutocompleteContext();
                if (context?.composer !== composer || context.key !== expectedKey) {
                    BdApi.UI.showToast('입력 내용이 변경되어 전송을 취소했습니다.', {type:'error'});
                    return;
                }
            }
            composer.focus();
            const down = new KeyboardEvent('keydown', {key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true, cancelable:true});
            const up = new KeyboardEvent('keyup', {key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true});
            this.syntheticSendEvents ??= new WeakSet();
            this.syntheticSendEvents.add(down); this.syntheticSendEvents.add(up);
            composer.dispatchEvent(down);
            composer.dispatchEvent(up);
            this.savedSelection = null;
        }, 0);
        this.pendingSendTimers.add(timer);
    }

    loadFavorites() { const saved = BdApi.Data.load(this.pluginName, 'favorites'); this.favorites = new Set(Array.isArray(saved) ? saved.filter(url => typeof url === 'string') : []); }
    saveFavorites() { BdApi.Data.save(this.pluginName, 'favorites', [...this.favorites]); }
    loadRecent() { const saved = BdApi.Data.load(this.pluginName, 'recent'); this.recent = Array.isArray(saved) ? [...new Set(saved.filter(item => typeof item === 'string'))].slice(0, this.maxRecent) : []; }
    saveRecent() { BdApi.Data.save(this.pluginName, 'recent', this.recent); }
    addRecent(item) { this.addRecentItems([item]); }
    addRecentItems(items) {
        if (!items.length) return;
        // 기존처럼 마지막에 전송한 항목이 맨 앞. 중복 선택도 같은 최종 순서를 만든다.
        for (const item of items) this.recent = [item.url, ...this.recent.filter(url => url !== item.url)].slice(0, this.maxRecent);
        this.saveRecent();
        if (this.sortByRecent) this.rerender();
    }
    loadSortSetting() { this.sortByRecent = BdApi.Data.load(this.pluginName, 'sortByRecent') === true; }
    saveSortSetting() { BdApi.Data.save(this.pluginName, 'sortByRecent', this.sortByRecent); }
    toggleSort() { this.sortByRecent = !this.sortByRecent; this.saveSortSetting(); this.rerender(); }
    sortItems(items) { if (!this.sortByRecent) return items; const rank = new Map(this.recent.map((url,index) => [url,index])); return [...items].sort((a,b) => (rank.get(a.url) ?? 999999)-(rank.get(b.url) ?? 999999)); }
    toggleFavorite(item) { this.favorites.has(item.url) ? this.favorites.delete(item.url) : this.favorites.add(item.url); this.saveFavorites(); this.rerender(); }
    rerender() { this.render(this.panel?.querySelector('.yuiko-search')?.value || ''); }
    pruneStoredUrls() {
        const favorites = [...this.favorites].filter(url => this.knownItems.has(url));
        const recent = this.recent.filter(url => this.knownItems.has(url));
        if (favorites.length !== this.favorites.size) { this.favorites = new Set(favorites); this.saveFavorites(); }
        if (recent.length !== this.recent.length) { this.recent = recent; this.saveRecent(); }
    }
    loadGroupSettings() {
        const validId = value => (typeof value === 'number' || typeof value === 'string' && value.trim() !== '') && Number.isSafeInteger(Number(value)) && Number(value) >= 0;
        const ids = values => [...new Set(values.filter(validId).map(Number))];
        const saved = BdApi.Data.load(this.pluginName, 'enabledGroups');
        this.enabledGroupIds = Array.isArray(saved) ? ids(saved) : null;
        const order = BdApi.Data.load(this.pluginName, 'groupOrder');
        this.groupOrder = Array.isArray(order) ? ids(order) : [];
        const selected = BdApi.Data.load(this.pluginName, 'selectedGroup');
        this.selectedGroupId = validId(selected) ? Number(selected) : null;
    }
    saveGroupSettings() { BdApi.Data.save(this.pluginName, 'enabledGroups', this.enabledGroupIds || []); BdApi.Data.save(this.pluginName, 'selectedGroup', this.selectedGroupId); BdApi.Data.save(this.pluginName, 'groupOrder', this.groupOrder); }

    /**
     * 저장된 groupOrder 순서로 this.groups를 정렬. 순서에 없는 새 그룹은 서버 순서대로 뒤에 붙임
     */
    applyGroupOrder() {
        if (!this.groups.length) return;
        const known = new Set(this.groups.map(group => group.id));
        this.groupOrder = [...this.groupOrder.filter(id => known.has(id)), ...this.groups.map(group => group.id).filter(id => !this.groupOrder.includes(id))];
        const rank = new Map(this.groupOrder.map((id, index) => [id, index]));
        this.groups.sort((a, b) => rank.get(a.id)-rank.get(b.id));
    }
    sortIdsByGroupOrder(ids) { const rank = new Map(this.groupOrder.map((id, index) => [id, index])); return [...ids].sort((a, b) => (rank.get(a) ?? 999999)-(rank.get(b) ?? 999999)); }
    /**
     * 드래그로 순서 바꾸기 (설정창 행 / 사이드바 탭 / 즐겨찾기 이모지 공용)
     * HTML5 drag&drop 대신 포인터 이벤트로 직접 구현: Discord가 window 레벨에서 네이티브 드래그를 가로채는(react-dnd) 영향을 받지 않음
     * @param container 이벤트를 위임받을 부모 요소 (자식이 다시 그려져도 동작)
     * @param selector  드래그·드롭 대상 요소 셀렉터
     * @param axis      'y'면 위/아래 절반, 'x'면 좌/우 절반으로 앞·뒤 판단
     * @param getId     요소 → 식별자
     * @param onDrop    (draggedId, targetId, before) 순서 변경 처리
     */
    bindDragReorder(container, selector, {axis, getId, onDrop}) {
        const threshold = 5;   // 이만큼 움직여야 드래그로 인정 (클릭과 구분)
        let state = null;
        const isBefore = (element, event) => { const rect = element.getBoundingClientRect(); return axis === 'x' ? event.clientX < rect.left + rect.width/2 : event.clientY < rect.top + rect.height/2; };
        const clearMarks = () => container.querySelectorAll('.drop-before, .drop-after').forEach(element => element.classList.remove('drop-before', 'drop-after'));
        const targetAt = event => { const hit = document.elementFromPoint(event.clientX, event.clientY)?.closest(selector); return hit && container.contains(hit) ? hit : null; };
        const reset = () => {
            if (!state) return;
            const current = state; state = null;
            try { container.releasePointerCapture(current.pointerId); } catch {}
            current.element.classList.remove('is-dragging');
            clearMarks();
            if (current.active) this.dragActive = false;
        };
        container.addEventListener('pointerdown', event => {
            if (event.button !== 0 || event.target.closest('input, button')) return;   // 좌클릭만, 체크박스·▲▼ 버튼은 제외
            const element = event.target.closest(selector);
            if (!element || !container.contains(element)) return;
            reset();
            state = {id:getId(element), element, startX:event.clientX, startY:event.clientY, pointerId:event.pointerId, active:false};
        });
        container.addEventListener('pointermove', event => {
            if (!state) return;
            if (state.pointerId !== undefined && event.pointerId !== undefined && state.pointerId !== event.pointerId) return;
            if (this.suppressEmojiClick || !state.element.isConnected) { reset(); return; }
            if (!state.active) {
                if (Math.hypot(event.clientX-state.startX, event.clientY-state.startY) < threshold) return;
                state.active = true; this.dragActive = true;
                this.cancelLongPress();
                state.element.classList.add('is-dragging'); this.hidePreview(); this.hideGroupPreview();
                try { container.setPointerCapture(event.pointerId); } catch {}
            }
            event.preventDefault();
            clearMarks();
            const target = targetAt(event);
            if (target && getId(target) !== state.id) target.classList.add(isBefore(target, event) ? 'drop-before' : 'drop-after');
        });
        const finish = event => {
            if (!state) return;
            if (state.pointerId !== undefined && event.pointerId !== undefined && state.pointerId !== event.pointerId) return;
            const current = state; state = null;
            try { container.releasePointerCapture(event.pointerId); } catch {}
            if (!current.active) return;
            this.dragActive = false;
            current.element.classList.remove('is-dragging'); clearMarks();
            const target = event.type === 'pointerup' ? targetAt(event) : null;
            if (current.element.isConnected && target && getId(target) !== current.id) onDrop(current.id, getId(target), isBefore(target, event));
            // 드래그를 끝낸 pointerup 뒤에 따라오는 click은 무시 (이모지 전송/그룹 선택 방지)
            this.suppressNextClick = true;
            clearTimeout(this.dragResetTimer);
            this.dragResetTimer = setTimeout(() => { this.dragResetTimer = null; this.suppressNextClick = false; }, 0);
        };
        // 캡처 전 영역 밖에서 버튼을 놓거나 창이 포커스를 잃어도 상태를 해제한다.
        // 컨테이너 리스너도 유지: Discord가 상위에서 전파를 막아도 드롭은 완료된다.
        container.addEventListener('pointerup', finish);
        container.addEventListener('pointercancel', finish);
        document.addEventListener('pointerup', finish);
        document.addEventListener('pointercancel', finish);
        window.addEventListener('blur', reset);
        container.addEventListener('lostpointercapture', reset);
        const cleanup = () => {
            this.dragCleanups.delete(cleanup);
            reset();
            container.removeEventListener('pointerup', finish);
            container.removeEventListener('pointercancel', finish);
            document.removeEventListener('pointerup', finish);
            document.removeEventListener('pointercancel', finish);
            window.removeEventListener('blur', reset);
            container.removeEventListener('lostpointercapture', reset);
        };
        this.dragCleanups.add(cleanup);
        return cleanup;
    }
    /**
     * 즐겨찾기 url을 targetUrl 앞/뒤로 이동 (Set의 삽입 순서를 다시 만듦)
     */
    moveFavoriteTo(url, targetUrl, before) {
        if (url === targetUrl || !this.favorites.has(url) || !this.favorites.has(targetUrl)) return;
        const order = [...this.favorites].filter(value => value !== url);
        order.splice(order.indexOf(targetUrl) + (before ? 0 : 1), 0, url);
        this.favorites = new Set(order); this.saveFavorites(); this.rerender();
    }
    /**
     * id 그룹을 targetId 그룹 앞(before=true) 또는 뒤로 이동
     */
    moveGroupTo(id, targetId, before) {
        if (id === targetId || !this.groupOrder.includes(id) || !this.groupOrder.includes(targetId)) return;
        const order = this.groupOrder.filter(value => value !== id);
        order.splice(order.indexOf(targetId) + (before ? 0 : 1), 0, id);
        this.setGroupOrder(order);
    }
    moveGroup(id, dir) {
        const from = this.groupOrder.indexOf(id), to = from+dir;
        if (from < 0 || to < 0 || to >= this.groupOrder.length) return;
        const order = [...this.groupOrder]; [order[from], order[to]] = [order[to], order[from]];
        this.setGroupOrder(order);
    }
    setGroupOrder(order) {
        this.groupOrder = order;
        this.applyGroupOrder(); this.saveGroupSettings();
        // 전체 보기의 이모지 순서도 새 그룹 순서를 따르도록 재정렬 (재요청 없이 로컬에서)
        const rank = new Map(this.groupOrder.map((groupId, index) => [groupId, index]));
        this.applyItems([...this.items].sort((a, b) => (rank.get(a.groupId) ?? 999999)-(rank.get(b.groupId) ?? 999999)));
        this.saveCache();
    }
};

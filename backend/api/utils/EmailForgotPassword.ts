export default (code: string) => ({
    subject: "Solicitação de nova senha Acadfy",
    text: `Código: ${code}
    Utilize este código no aplicativo para resetar sua senha!`,
    html: `<div>
    <p>Utilize este código no aplicativo para resetar sua senha!</p>
    <p>Código: ${code}</p>
    </div>`
  });
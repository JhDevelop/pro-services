import express, { Express, Request, NextFunction } from "express";
import router from "./routes/auth.routes";
import offers_routes from "./routes/offerts.routes";
import company_routes from "./routes/company.routes";
import person_routes from "./routes/person.routes";

const app: Express = express();

app.use(express.json());

// Enable CORS manualmente
app.use((_req: Request, _res: any, _next: NextFunction) => {
    _res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen (ajusta según tus necesidades)
    _res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    _res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    _res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Para preflight (opciones) requests
    if (_req.method === 'OPTIONS') {
        return _res.sendStatus(200);
    }

    // Si no es una solicitud de opciones, pasa al siguiente middleware
    _next();
});

app.use('/api', router);
app.use('/api', company_routes);
app.use('/api', offers_routes);
app.use('/api', person_routes);


app.listen(() => {
    console.log(`Servidor Express escuchando en el puerto ${5173}`);
});

export default app;
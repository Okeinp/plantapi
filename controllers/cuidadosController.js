import cuidadosModel from "../models/cuidadosModel.js";

// Obtener todos los cuidados
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, sort = 'fecha_programada', tipo } = req.query;
    
    try {
        const query = {};
        if (tipo) query.tipo = tipo;

        const cuidados = await Cuidados.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const count = await Cuidados.countDocuments(query);
        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: page,
            cuidados,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un cuidado específico por ID
router.get('/:id', async (req, res) => {
    try {
        const cuidado = await Cuidados.findById(req.params.id);
        if (!cuidado) return res.status(404).json({ message: 'Cuidado no encontrado' });
        res.json(cuidado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Registrar un nuevo cuidado
router.post('/', async (req, res) => {
    const { planta_id, tipo, fecha_programada, estado } = req.body;
    
    const nuevoCuidado = new Cuidados({
        planta_id,
        tipo,
        fecha_programada,
        estado,
    });

    try {
        const savedCuidado = await nuevoCuidado.save();
        res.status(201).json(savedCuidado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un cuidado existente
router.put('/:id', async (req, res) => {
    try {
        const cuidado = await Cuidados.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cuidado) return res.status(404).json({ message: 'Cuidado no encontrado' });
        res.json(cuidado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un cuidado
router.delete('/:id', async (req, res) => {
    try {
        const cuidado = await Cuidados.findByIdAndDelete(req.params.id);
        if (!cuidado) return res.status(404).json({ message: 'Cuidado no encontrado' });
        res.json({ message: 'Cuidado eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

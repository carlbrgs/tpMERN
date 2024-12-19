const Annonce = require("../models/annonceModel");

const createAnnonce = async (req, res) => {
  const authorId = req.user.id;
  try {
    const annonce = new Annonce({
      ...req.body,
      author: authorId,
    });
    if (!annonce) {
      return res.status(400).send("Merci de remplir tous les champs");
    }
    await annonce.save();
    res.status(201).send(annonce);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnonces = async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }
    if (req.query.description) {
      filter.description = { $regex: req.query.description, $options: "i" };
    }

    const annonces = await Annonce.find(filter).populate(
      "author",
      "username email"
    );

    res.status(200).send(annonces);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnonceById = async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.annonceId).populate(
        "author",
        "username email"
        );
        if (!annonce) {
        return res.status(404).send({ error: "Annonce introuvable" });
        }
        res.status(200).send(annonce);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndUpdate(
      req.params.annonceId,
      req.body,
      {
        new: true,
      }
    );
    if (!annonce) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send(annonce);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAnnonceByUserId = async (req, res) => {
  try {
    const annonces = await Annonce.find({ author: req.params.userId }).populate(
      "author",
      "username email"
    );
    if (!annonces || annonces.length === 0) {
      return res.status(404).send({ error: "Aucune annonce trouvée" });
    }
    res.status(200).send(annonces);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.annonceId);
    if (!annonce) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send({ message: "Annonce supprimée" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { createAnnonce, getAnnonces, updateAnnonce, getAnnonceByUserId, deleteAnnonce, getAnnonceById};

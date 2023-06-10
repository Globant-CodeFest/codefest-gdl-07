import { Request, Response } from "express";
import { Users } from "../entity/users.entity";




export const createUser = async (req: Request, res: Response) => {
    const {name,id_company,id_user} =req.body;
    const user = await Users.createQueryBuilder("user")
    .where("user.id_company = :id_company", { id_company: id_company })
    .andWhere("user.id_user = :id_user", { id_user:id_user  }).getExists();
    
    if (!user) {
        const user = new Users();
        user.name = name;
        user.id_company = id_company;
        user.id_user = id_user;
        await user.save();
        res.status(201).json(user);
    }else{
        res.status(404).json({ message: "El usuario ya existe." });
    }
   
}

export const readUser =async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (id) {
            const dataUser = await Users.findOneBy({ id: parseInt(id) });

            if (!dataUser) return res.status(404).json({ message: "No se encontro ningun resultado." });

            return res.status(201).json(dataUser);
        } else {
            const dataUsers = await Users.find();
            return res.status(201).json(dataUsers);
        }


    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const dataUser = await Users.findOneBy({ id: parseInt(id) });
      if (!dataUser) return res.status(404).json({ message: "No se encontro ningun resultado" });
  
      await Users.update({ id: parseInt(id) }, req.body);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await Users.delete({ id: parseInt(id) });
  
      if (result.affected === 0)
        return res.status(404).json({ message: "No se encontro ningun resultado" });
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
}
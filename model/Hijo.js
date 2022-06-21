import { getData } from './db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const Hijo = getData.SequelizeClient.define('cat_padre', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ap_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ap_materno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    }
}, {
    tableName: 'cat_padre',
    freezeTableName: true,
    // hooks: {
    //     beforeCreate: (user, options) => {
    //         {
    //             user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
    //         }
    //     }
    // }
});



export const getHijo = Hijo;
import { getTeams } from "../data.js";
import { setUserTeamId } from "../data.js";

export default async function (context) {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    const teams = await getTeams();

    console.log(teams);
    console.log(this.app.userData);

    const data = Object.assign({teams}, this.app.userData);

    this.partial('./templates/catalog/teamCatalog.hbs', data);
}

export async function joinTeamPost() {

    console.log("INSIDE");

    // try {
    //
    //     // Assign teamId to user
    //     const result  = await setUserTeamId(this.app.userData.userId, "F75D503F-4357-4210-8768-1B61777B8945");
    //
    //     if (result.hasOwnProperty('errorData')) {
    //         const error = new Error();
    //         Object.assign(error, result);
    //         throw error;
    //     }
    //
    //     this.redirect(`#/catalog/${result.objectId}`);
    // } catch (err) {
    //     console.error(err);
    //     alert(err.message);
    // }
}
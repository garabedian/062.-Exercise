export default async function (context) {

    // Register partial .hbs (returns promise)
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    // Sammy's context === this (Sammy.RenderContext)
    // Renders templates and screen visualization with upper scope data
    this.partial('./templates/home/home.hbs', this.app.userData);

    /* // (NOT .hbs) this.partial() === this.render().then(this.swap);
    this.render('./templates/register/registerForm.hbs').then(function (html) {
        this.swap(html);
    });
    */
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Image nuevaImagen;
        ContentPlaceHolder contenido = (ContentPlaceHolder)this.Master.FindControl("ContentPlaceHolder1");

        string[] imagenes = Directory.GetFiles(Server.MapPath("../uploads/"));
        foreach (var img in imagenes)
        {
            nuevaImagen = new Image();
            nuevaImagen.ImageUrl = Path.GetFileName(img);
            contenido.Controls.Add(nuevaImagen);
        }
    }
}
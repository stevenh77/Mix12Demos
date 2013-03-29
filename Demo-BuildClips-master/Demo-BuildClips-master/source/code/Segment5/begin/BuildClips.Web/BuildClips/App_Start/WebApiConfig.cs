﻿namespace BuildClips
{
    using BuildClips.Extensions;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            Action clearCache = () => new Microsoft.ApplicationServer.Caching.DataCache().Clear();
            config.MessageHandlers.Add(new ApiExecutionProfiler(clearCache));
        }
    }
}

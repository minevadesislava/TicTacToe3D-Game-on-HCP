package com.sap.hana.cloud.tictactoe3d.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.sql.DataSource;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.persistence.config.PersistenceUnitProperties;

import com.sap.hana.cloud.tictactoe3d.model.Player;

@Path("/players")
@Produces({ MediaType.APPLICATION_JSON })
public class PlayerService 
{
	@SuppressWarnings("unchecked")
	@GET
	@Path("/")
	public List<Player> getPlayers()
	{
		List<Player> retVal = null;
		
		EntityManager em = this.getEntityManagerFactory().createEntityManager();

		retVal = em.createNamedQuery("Players").getResultList();
		
		return retVal;
	}
	
	@GET
	@Path("/{name}")
	public Player getPlayer(@PathParam(value = "name") String name)
	{
		Player retVal = null;
				
		EntityManager em = this.getEntityManagerFactory().createEntityManager();
		
		try
		{
			Query query = em.createNamedQuery("PlayersByName");
			query.setParameter("name", name);
			retVal = (Player) query.getSingleResult();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return retVal;
	}
	

	
	@SuppressWarnings("unchecked")
	@POST
	@Path("/add")
	public void addPlayer(String username)
	{			
		EntityManager em = this.getEntityManagerFactory().createEntityManager();
		Player player = new Player();
		player.setName(username);
		player.setUnfinishedGame("GGGGGGGGGGGGGGGGGGGGGGGGGGGH");
		try
		{
			em.getTransaction().begin();
			em.persist(player);
			em.getTransaction().commit();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			em.close();
		}
	}
	
	@SuppressWarnings("unchecked")
	@DELETE
	@Path("./delete/{name}")
	public boolean removePlayer(@PathParam(value = "name") String name)
	{
		boolean retVal = false;
		
		EntityManager em = this.getEntityManagerFactory().createEntityManager();
		
		try
		{
			Query query = em.createNamedQuery("PlayersByName");
			query.setParameter("name", name);
			Player player = (Player) query.getSingleResult();
			
			if (player != null)
			{
				em.getTransaction().begin();
				em.remove(player);
				em.getTransaction().commit();
			}
			
			retVal = true;
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return retVal;
	}
	
	
	@SuppressWarnings("unchecked")
	@POST
	@Path("/update/{name}")
	public boolean updatePlayer(@PathParam(value = "name") String name, String game) {
		boolean retVal = false;
		EntityManager em = this.getEntityManagerFactory().createEntityManager();
		
		try
		{
			Query query = em.createNamedQuery("PlayersByName");
			query.setParameter("name", name );
			Player player = (Player) query.getSingleResult();
			
			if (player != null)
			{
				player.setUnfinishedGame(game);
				
				em.getTransaction().begin();
				player = em.merge(player);
				em.getTransaction().commit();
			}
			
			
			
			retVal = true;
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return retVal;
	}
	
	/**
	 * Returns the <code>DefaultDB</code> {@link DataSource} via JNDI.
	 * 
	 * @return <code>DefaultDB</code> {@link DataSource}
	 */
	protected DataSource getDataSource()
	{
		DataSource retVal = null;
		
		try 
	    {
	        InitialContext ctx = new InitialContext();
	        retVal = (DataSource) ctx.lookup("java:comp/env/jdbc/DefaultDB");
	    }
		catch (NamingException ex)
		{
			ex.printStackTrace();
		}
		
		return retVal;
	}
	
	/**
	 * Returns the {@link EntityManagerFactory}.
	 * 
	 * @return The {@link EntityManagerFactory}
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected EntityManagerFactory getEntityManagerFactory()
	{
		EntityManagerFactory retVal = null;
		
		try
		{
			Map properties = new HashMap();
			
			DataSource ds = this.getDataSource();
			
	        properties.put(PersistenceUnitProperties.NON_JTA_DATASOURCE, ds);
	        
	        retVal = Persistence.createEntityManagerFactory("application", properties);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		
		return retVal;
	}
	
}